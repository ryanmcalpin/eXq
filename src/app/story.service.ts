import { Injectable } from '@angular/core';
import { Story } from './story.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@Injectable()
export class StoryService {
  stories: FirebaseListObservable<any[]>;
  uid: string = "2ySG5BK3YMWUZbNW4Ws8PSr3AAA3";

  constructor(private database: AngularFireDatabase) {
  }

  getStories(uid) {
    return this.database.list('games/' + uid);
  }
}
