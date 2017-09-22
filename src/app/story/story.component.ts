import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

import { StoryService } from '../story.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  user: any = null;
  story: any;
  hasInvite: boolean;
  needsInvite: boolean;
  fullStory: string = "    ";
  storyId: string;



  constructor(private storyService: StoryService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.storyId = params['id'];
      this.authService.getCurrentUser()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(user => {
          this.user = user; //if not null check?
          this.storyService.getStory(user.uid, params['id'])
          .takeUntil(this.ngUnsubscribe)
          .subscribe(story => {
            this.story = story;
            this.buildStory();
          });
        });
    });
  }

  buildStory() {
    this.needsInvite = !this.story.collaboratorName;
    this.hasInvite = this.story.collaboratorName && !this.story.collaboratorUid;

    for (var i = 0; i < this.story.ownerSentences.length; i++) {
      this.fullStory = this.fullStory.concat(this.story.ownerSentences[i]);
      if (this.story.collaboratorSentences && this.story.collaboratorSentences[i]) {
        this.fullStory = this.fullStory.concat(" " + this.story.collaboratorSentences[i] + " ");
      }
    }
  }

  goToInvite() {
    this.router.navigate(['/invite', this.storyId]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
