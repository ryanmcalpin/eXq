import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { FirebaseObjectObservable } from 'angularfire2/database';

import { StoryService } from '../story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  user: any;
  story: FirebaseObjectObservable<any>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(private storyService: StoryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : null;

      this.route.paramMap.switchMap((params: ParamMap) => this.storyService.getStory(this.user.uid, params.get('id'))).takeUntil(this.ngUnsubscribe).subscribe(story => this.story = story);
    });
  }

}
