import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { QuizComponent } from './quiz/quiz.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'user-profile' , component: UserProfileComponent,

  },
  {
    path: 'edit-user-profile' , component: EditUserProfileComponent
  },
  {
    path: 'quiz' , component: QuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
