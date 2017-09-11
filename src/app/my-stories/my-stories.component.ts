import { Component, OnInit } from '@angular/core';

import { StoryService } from '../story.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.css']
})
export class MyStoriesComponent implements OnInit {
  stories: FirebaseListObservable<any[]>;

  constructor(private storyService: StoryService) { }

  ngOnInit() {
    this.stories = this.storyService.getStories();
  }

}
