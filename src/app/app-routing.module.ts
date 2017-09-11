import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewStoryComponent } from './new-story/new-story.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: NewStoryComponent
  },
  {
    path: 'my-stories',
    component: MyStoriesComponent
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
