import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewStoryComponent } from './new-story/new-story.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: NewStoryComponent
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
