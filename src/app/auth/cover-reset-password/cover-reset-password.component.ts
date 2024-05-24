import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../../appModules/mat.module';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthserviceService } from '../../authservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cover-reset-password',
  standalone: true,
  imports: [CommonModule, MatModule, FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,],
  templateUrl: './cover-reset-password.component.html',
  styleUrl: './cover-reset-password.component.scss'
})
export class CoverResetPasswordComponent {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  @ViewChild('resetPasswordNgForm')
  resetPasswordNgForm!: NgForm;
  
  public show: boolean = false;

  
  constructor( private _authservice: AuthserviceService,
    private _formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute) { }
    hide = true;
    token!: string;

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      
    });

    this.authForm = this._formBuilder.group({
      password  : new FormControl('',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[0-9A-Za-zd$@$!%*?&].{6,}')]),
      passwordConfirm: ['', Validators.required]
  },
 
);
  }




  resetPassword() {
    const passwordControl = this.authForm.get('password');
    const passwordConfirmControl = this.authForm.get('passwordConfirm');

    if (passwordControl && passwordConfirmControl) {
        const password = passwordControl.value;
        const passwordConfirm = passwordConfirmControl.value;

        if (password !== passwordConfirm) {
            alert('Confirm password not valid!');
            return;
        }
    } else {
        console.error("One or both controls are null.");
        return;
    }

    if (this.authForm.valid) {
        const newPassword = passwordControl.value; // Obtenir la valeur du contrôle 'password'

        this._authservice.resetPasswordd(this.token, newPassword).subscribe(
            (result: any) => {
          
                if (result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'You clicked the button!',
                        showConfirmButton: true,
                    });
                    this.authForm.reset();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: 'Why do I have this issue?',
                    });
                }
            },
        );
    }
}

confirm_password() {
  if (this.authForm.value.password !== '' && this.authForm.value.passwordConfirm !== '') {
      if (this.authForm.value.password !== this.authForm.value.passwordConfirm) {
          return true;
      } else {
          return false;
      }
  } else {
      return false;
  }
}




}