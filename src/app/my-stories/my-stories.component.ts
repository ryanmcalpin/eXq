import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

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
  stories: any;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(private authService: AuthService,
              private storyService: StoryService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(user => {
        if (user) {
          this.user = user;
          this.getStories(user.uid);
        } else {
          this.user = null;
        }
      });
  }

  getStories(uid: string) {
    this.storyService.getStories(uid)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(stories => {
        this.stories = stories;
        console.log(this.stories);
      });
  }

  selectStory(story) {
    this.router.navigate(['/story', story.firebaseKey]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
