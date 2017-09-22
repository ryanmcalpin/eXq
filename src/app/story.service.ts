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
    return fKey;
  }

  punctuate(sentence: string): string {
    var puncAsLast = sentence.slice(sentence.length - 1).match(/(\.|\?|\!)/);
    var periodAsLast = sentence.slice(sentence.length - 1).match(/\./);
    var quoteAsLast = sentence.slice(sentence.length - 1).match(/(\'|\")/);
    var puncAsSecondToLast = sentence.slice(sentence.length - 2, sentence.length - 1).match(/(\.|\?|\!)/);
    var quoteAsSecondToLast = sentence.slice(sentence.length - 2, sentence.length - 1).match(/(\'|\")/);

    if (quoteAsLast && !puncAsSecondToLast) {
      sentence = sentence.slice(0, sentence.length - 1) + "." + sentence.slice(sentence.length - 1);
    } else if (quoteAsSecondToLast && periodAsLast) {
      sentence = sentence.slice(0, sentence.length - 2) + "." + sentence.slice(sentence.length - 2, sentence.length - 1);
    } else if (!quoteAsLast && !puncAsLast) {
      sentence = sentence.concat(".");
    }

    if (sentence.slice(0, 1).match(/(\'|\")/)) {
      sentence = sentence.charAt(0) + sentence.charAt(1).toUpperCase() + sentence.slice(2);
    } else {
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    }

    return sentence;
  }

  private handleError(error: any): Promise<any> {
    console.error('And error occurred', error); //demo only
    return Promise.reject(error.message || error);
  }
}
