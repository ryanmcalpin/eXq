import { Injectable } from '@angular/core';
//import story model
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class StoryService {
  stories: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.stories = database.list('games');
  }

  getStories(){
    return this.stories;
  }
}
