import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../auth.service';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  user: any;
  storyId: string;
  story: any;

  constructor(private authService: AuthService,
              private storyService: StoryService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.storyId = params['id'];
      this.authService.getCurrentUser()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(user => {
          this.user = user;
          this.storyService.getStory(this.user.uid, this.storyId)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(story => this.story = story);
      });
    });
  }

  clickInvite(inviteeName) {
    this.storyService.doesUserExist(inviteeName)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(invitee => {
        if (invitee.$value) {
          this.inviteUser(invitee.$value, invitee.$key);
        } else {
          alert("User does not exist!");
        }
      });
  }

  inviteUser(inviteeUid, inviteeName) {
    this.storyService.inviteUser(inviteeUid, inviteeName, this.story)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(story => {
        this.router.navigate(['/story', story.firebaseKey]);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
