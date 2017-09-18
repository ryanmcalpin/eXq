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
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  user: any;
  story: FirebaseObjectObservable<any>;
  hasInvite: boolean;
  needsInvite: boolean;
  fullStory: string = "    ";



  constructor(private storyService: StoryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : null;

      this.route.paramMap.switchMap((params: ParamMap) =>
        this.storyService.getStory(this.user.uid, params.get('id')))
          .takeUntil(this.ngUnsubscribe)
          .subscribe(story => {
            this.story = story;
            this.needsInvite = !story.collaboratorName;
            this.hasInvite = story.collaboratorName && !story.collaboratorUid;

            for (var i = 0; i < story.ownerSentences.length; i++) {
              this.fullStory = this.fullStory.concat(story.ownerSentences[i]);
              if (story.collaboratorSentences && story.collaboratorSentences[i]) {
                this.fullStory = this.fullStory.concat(" " + story.collaboratorSentences[i] + " ");
              }

            }

            console.log(this.story);

        });
    });
  }

}
