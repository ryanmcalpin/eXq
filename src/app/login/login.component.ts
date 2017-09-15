import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : null;
    });
  }

  login(email, password) {
    this.authService.login(email, password);
    this.router.navigate(['/my-stories']);
  }
}
