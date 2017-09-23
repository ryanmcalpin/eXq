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
      .subscribe(user => {
        if (user.$value) {
          console.log(user)
          this.inviteUser(user.$value, user.$key)
        } else {
          console.log('hrmm')
        }
      });
  }

  inviteUser(inviteeUid, inviteeName) {
    this.storyService.inviteUser(inviteeUid, inviteeName)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(results => console.log(results))
  }

}
