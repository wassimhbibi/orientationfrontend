import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LockScreenComponent } from './lock-screen/lock-screen.component';


import { CoverSigninComponent } from './cover-signin/cover-signin.component';
import { CoverSignupComponent } from './cover-signup/cover-signup.component';
import { CoverForgotPasswordComponent } from './cover-forgot-password/cover-forgot-password.component';
import { CoverResetPasswordComponent } from './cover-reset-password/cover-reset-password.component';
import { authGuard } from '../auth.guard';
// import { SigninWithHeaderFooterComponent } from './signin-with-header-footer/signin-with-header-footer.component';
// import { SignupWithHeaderFooterComponent } from './signup-with-header-footer/signup-with-header-footer.component';

const routes: Routes = [
  {
    path: '',
    children: [
   
      {
        path: 'cover-signin',

        component: CoverSigninComponent,
        data: {
          title: 'Cover Sign In'
        }
      },
    
      {
        path: 'cover-signup',
     
        component: CoverSignupComponent,
        data: {
          title: 'Cover Sign Up'
        }
      },
    
      {
        path: 'cover-forgot-password',
        
        component: CoverForgotPasswordComponent,
        data: {
          title: 'Cover Forgot Password'
        }
      },
   
      {
        path: 'cover-reset-password',
        component: CoverResetPasswordComponent,
        data: {
          title: 'Cover Reset Password'
        }
      },
      {
        path: 'lock-screen',
        component: LockScreenComponent,
        data: {
          title: 'Lock Screen'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
