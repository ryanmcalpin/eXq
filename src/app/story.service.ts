import { Injectable } from '@angular/core';
import { Story } from './story.model';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class StoryService {

  constructor(private database: AngularFireDatabase) {
  }

  getStories(uid) {
    return this.database.list('games/' + uid);
  }

  getStory(uid, id) {
    return this.database.object('games/' + uid + '/' + id);
  }

  createStory(story: Story) {
    var fKey = this.database.list('games/' + story.ownerUid).push(story).key;
    this.database.object('games/' + story.ownerUid + '/' + fKey + '/firebaseKey').set(fKey);
  }

  private handleError(error: any): Promise<any> {
    console.error('And error occurred', error); //demo only
    return Promise.reject(error.message || error);
  }
}
