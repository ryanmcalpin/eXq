import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewStoryComponent } from './new-story/new-story.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { LoginComponent } from './login/login.component';
import { StoryComponent } from './story/story.component';
import { InviteComponent } from './invite/invite.component';

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
  },
  {
    path: 'story/:id',
    component: StoryComponent
  },
  {
    path: 'invite/:id',
    component: InviteComponent
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
