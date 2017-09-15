import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
  }

  createAccount(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => alert(error.message));
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(error => alert(error.message));
  }

  getCurrentUser() {
    return this.user;
  }
}
