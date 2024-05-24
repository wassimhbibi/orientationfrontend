import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../../appModules/mat.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthserviceService } from '../../authservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cover-forgot-password',
  standalone: true,
  imports: [CommonModule, MatModule, RouterLink,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './cover-forgot-password.component.html',
  styleUrl: './cover-forgot-password.component.scss'
})
export class CoverForgotPasswordComponent {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm!: NgForm;
  public show: boolean = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authservice: AuthserviceService,
    private _formBuilder: UntypedFormBuilder
  ) { }

  

  ngOnInit() {

    this.authForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
  });
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      const emailControl = this.authForm.get('email');
  
      if (emailControl) {
        const email = emailControl.value;
  
        this._authservice.getusers().subscribe(data => {
          console.log("data",data)
          const asp = data.some(a => a.email === email);
  
          if (asp) {
            this._authservice.requestPasswordReset(email).subscribe(
              (response) => {
                if (response) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'The password reset link is sent in your email, Please check your email',
                  });
                }
              },
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'This email does not exist!',
              footer: '<a href>Why do I have this issue?</a>',
            });
          }
        });
      } else {
     
      }
    }
  }
  

}