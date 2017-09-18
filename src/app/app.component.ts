import { Component, OnInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Exquisite';
  user: any;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : null;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
