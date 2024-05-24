import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { MatModule } from '../../appModules/mat.module';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthserviceService } from '../../authservice.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-cover-signin',
  standalone: true,
  imports: [CommonModule, MatModule, RouterModule, RouterLink,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,],
  templateUrl: './cover-signin.component.html',
  styleUrl: './cover-signin.component.scss'
})
export class CoverSigninComponent {
  constructor(
    public router: Router,
    private _authservice: AuthserviceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }
  hide = true;

authForm: FormGroup;
    email: any;
    password: any;
    rememberMeChecked: boolean = false;
    returnUrl:any;
  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password  : new FormControl('',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@/.;:$!%*?&])[0-9A-Za-zd$@/.;:$!%*?&].{7,}')]),
      rememberMe: [this.rememberMeChecked],
    });
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      const { email, password } = JSON.parse(rememberedUser);
      this.authForm.patchValue({
        email,
        password,
        rememberMe: true // Check the "Remember Me" checkbox
      });
    }
  }
   
    login() {
      const { email, password, rememberMe } = this.authForm.value;
      // Remember Me logic
      if (rememberMe) {
        // Store user credentials in a more persistent storage (e.g., cookies or local storage)
        localStorage.setItem('rememberedUser', JSON.stringify({ email, password }));
      }
       console.log('hhhhh',this.authForm.value)
    this._authservice.Rech(this.authForm.value).subscribe(res=>{(res.toString());
     
      if(res==true){

     
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully Sigin .',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(["/profile/user-profile" ],{ queryParams: { email } });
 

    
    
    
      }
    
    else{
  
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email Or password is invalid.',
      });

    
   
    
    
    
    } }
    
    
    
    
    );
    
    
    }
  }

