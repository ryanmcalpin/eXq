import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewStoryComponent } from './new-story/new-story.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/my-stories',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: NewStoryComponent
  },
  {
    path: 'my-stories',
    component: MyStoriesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
