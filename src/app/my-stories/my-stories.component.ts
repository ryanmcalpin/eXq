import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';

import { AuthService } from '../auth.service';
import { StoryService } from '../story.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.css']
})
export class MyStoriesComponent implements OnInit {
  user: any;
  stories: FirebaseListObservable<any[]>;

  constructor(private authService: AuthService,
              private storyService: StoryService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : null;
      this.stories = this.storyService.getStories(this.user.uid);
    });
  }

}
