import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../../appModules/mat.module';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthserviceService } from '../../authservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cover-signup',
  standalone: true,
  imports: [CommonModule, MatModule, RouterModule,RouterLink,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,],
  templateUrl: './cover-signup.component.html',
  styleUrl: './cover-signup.component.scss',

 
})
export class CoverSignupComponent implements OnInit  {

  constructor(private router: Router, private route: ActivatedRoute,private formBuilder: UntypedFormBuilder, private authservice : AuthserviceService){}
  showMoreFields = false;
  signupForm: FormGroup;
  hide = true;
  currentStep = 1;
  years: number[] = [];
  fileName: string = '';
  PhotoFilePath:string;
  photo:string="";

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern('[a-zA-Z" "]*')]],
      lastname: ['', [Validators.required,Validators.pattern('[a-zA-Z" "]*')]],
      datebirth: ['', Validators.required],
      adress: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[0-9A-Za-zd$@$!%*?&].{6,}')]],
      confirmPassword: ['', Validators.required],
      phone: ['',[Validators.required,Validators.pattern('[0-9]*')]],
      gender: ['', Validators.required],
      photo: [''],
      year1:[''],
      year2:[''],
      year3:[''],
      etablisment1:[''],
      etablisment2:[''],
      etablisment3:[''],
      parcour1:[''],
      parcour2:[''],
      parcour3:[''],
      speciality:[''],
      status:[''],
      encours:['false'],
      terms: [false, Validators.requiredTrue]

    
        
    });

    const currentYear = new Date().getFullYear();
    for (let year = 2010; year <= currentYear; year++) {
      this.years.push(year);
    }
  }


  confirm_password() {
    

    if (this.signupForm.value.password !== '' && this.signupForm.value.confirmPassword !== '') {
        if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}



  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }


  showAdditionalFields() {
    this.showMoreFields = true;
  }
  
  signUp(): void
  {
  
  
      // Do nothing if the form is invalid
      if ( this.signupForm.invalid )
      {
          return;
      }

      // Disable the form
      this.signupForm.disable();

     
      // Sign up
      const val = {
          email: this.signupForm.value.email,
          password: this.signupForm.value.password
        }  
         
      this.authservice.verifAccount(val).subscribe(responce=>{(responce.toString());
         
          if(responce==true){
             Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email exist , try again!',
            });
               // Re-enable the form
               this.signupForm.enable();
              }
              else{
                this.authservice.signUp(this.signupForm.value).subscribe(responce => {
                  if (responce ) {       
             }
                      });
                     // Navigate to the confirmation required page
           
                     Swal.fire({
                      title: 'Success!',
                      text: 'You have successfully Sigin .',
                      icon: 'success',
                      confirmButtonText: 'OK'
                    });
                    this.router.navigateByUrl('/auth/cover-signin');
              }}
          );
  }

 
PhotoPath(path:any){
return path
}

uploadPhoto(event) {
  const file = event.target.files[0];
  const formData: FormData = new FormData();
  formData.append('uploadedFile', file);
  

  this.authservice.uplodephoto(formData).subscribe((data: any) => {
    this.photo = data.toString();
   
    this.signupForm.patchValue({ photo: this.photo });
    this.PhotoFilePath = this.authservice.PhotoUrl + this.photo;
  });
}

}
