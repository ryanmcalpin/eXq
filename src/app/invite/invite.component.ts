import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../auth.service';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  user: any;
  storyId: string;

  constructor(private authService: AuthService,
              private storyService: StoryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.storyId = params['id'];
      this.authService.getCurrentUser()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(user => {
          this.user = user;
      });
    });
  }

  clickInvite(inviteeName) {
    this.storyService.doesUserExist(inviteeName)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(invitee => {
        if (invitee.$value) {
          this.inviteUser(invitee.$value, invitee.$key);
          console.log(this.user.uid)
        } else {
          alert("User does not exist!");
        }
      });
  }

  inviteUser(inviteeUid, inviteeName) {
    this.storyService.getStory(this.user.uid, this.storyId)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(story => {
        this.storyService.inviteUser(inviteeUid, inviteeName, story)
          .takeUntil(this.ngUnsubscribe)
          .subscribe(results => {
            console.log("results: " + results)
            // NAVIGATE on Callback, results need to be..game?
            // console.log(results);
          });
      });
  }

}
