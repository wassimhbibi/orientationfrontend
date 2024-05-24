import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LockScreenComponent } from './lock-screen/lock-screen.component';

import { MatModule } from 'src/app/appModules/mat.module';
import { CoverForgotPasswordComponent } from './cover-forgot-password/cover-forgot-password.component';
import { CoverResetPasswordComponent } from './cover-reset-password/cover-reset-password.component';
import { CoverSigninComponent } from './cover-signin/cover-signin.component';
import { CoverSignupComponent } from './cover-signup/cover-signup.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [

    LockScreenComponent, 

   
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatModule,
    CoverSigninComponent,
    CoverSignupComponent,
    CoverForgotPasswordComponent,
    CoverResetPasswordComponent,
    RouterLink,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class AuthModule { }
