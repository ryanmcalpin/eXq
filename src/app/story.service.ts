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

  private handleError(error: any): Promise<any> {
    console.error('And error occurred', error); //demo only
    return Promise.reject(error.message || error);
  }
}
