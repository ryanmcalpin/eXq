import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { FirebaseListObservable } from 'angularfire2/database';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../auth.service';
import { StoryService } from '../story.service';
import { Story } from '../story.model';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.css']
})
export class MyStoriesComponent implements OnInit, OnDestroy {
  user: any;
  stories: FirebaseListObservable<any[]>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(private authService: AuthService,
              private storyService: StoryService,
              private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : null;
      this.getStories(this.user.uid);
    });
  }

  getStories(uid: string) {
    this.storyService.getStories(uid)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(stories => this.stories = stories);
  }

  selectStory(story) {
    this.router.navigate(['/story', story.firebaseKey]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
