import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

import { StoryService } from '../story.service';
import { Story } from '../story.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.css']
})
export class NewStoryComponent implements OnInit {
  user: any;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(private storyService: StoryService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(user => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      });
  }

  createStory(sentence: string): void {
    if (sentence.trim().length < 2) {
      alert("Enter a sentence!");
    } else {
      var punctuatedSentence = this.storyService.punctuate(sentence.trim());
      var story = new Story(punctuatedSentence, this.user.displayName, [punctuatedSentence], this.user.uid);

      console.log(punctuatedSentence);
      // this.storyService.createStory(story);
    }
  }

}
