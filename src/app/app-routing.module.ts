import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './pages/comments/comments.component';
import { StoriesComponent } from './pages/stories/stories.component';

const routes: Routes = [
  { path: 'stories', component: StoriesComponent },
  { path: 'stories/:id/comments', component: CommentsComponent },
  { path: " ", redirectTo: "stories", pathMatch: 'full' },
  { path: "**", redirectTo: "stories" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
