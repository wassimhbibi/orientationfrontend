import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { HttpClient } from '@angular/common/http';
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [CommonModule, MatModule,  MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.scss'
})
export class EditUserProfileComponent {

  Email:any
  PhotoUrl ="http://localhost:44315/photo";
  PhotoUrl2 ="http://localhost:44315/photo";
   PhotoFilePath:any;
   profile:any
   photo:string="";
   photocov:string="";
   profileForm: FormGroup;
   PhotoFilePath2:any;
   
  constructor(
    public httpClient: HttpClient,
    public authservice: AuthserviceService,
   private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    public router: Router, 
  ) {

  }

  ngOnInit() {
    this.authservice.getEmail().then(email => {
      // Log email inside the promise
          this.Email = email;
          this.profileForm= this.fb.group({
            id:[null],
            name: ['', [Validators.required]], 
            lastname: ['', [Validators.required]], 
            datebirth: ['', [Validators.required]],
            email:[this.Email], 
            adress: ['', [Validators.required]], 
            gender: ['', [Validators.required]], 
            phone: ['', [Validators.required]], 
            status: ['', [Validators.required]], 
            photo:[''],
            datestage1: ['', [Validators.required]], 
            titlestage1: ['', [Validators.required]], 
            stage1: ['', [Validators.required]], 
            datestage2: ['', [Validators.required]], 
            titlestage2: ['', [Validators.required]], 
            stage2: ['', [Validators.required]], 
            datestage3: ['', [Validators.required]], 
            titlestage3: ['', [Validators.required]], 
            stage3: ['', [Validators.required]], 
            datestage4: ['', [Validators.required]], 
            titlestage4: ['', [Validators.required]], 
            stage4: ['', [Validators.required]], 
            datestage5: ['', [Validators.required]], 
            titlestage5: ['', [Validators.required]], 
            stage5: ['', [Validators.required]], 
            datestage6: ['', [Validators.required]], 
            titlestage6: ['', [Validators.required]], 
            stage6: ['', [Validators.required]], 
            


            dateparcourpro1: ['', [Validators.required]], 
            titleparcourpro1: ['', [Validators.required]], 
            parcourpro1: ['', [Validators.required]], 
            dateparcourpro2: ['', [Validators.required]], 
            titleparcourpro2: ['', [Validators.required]], 
            parcourpro2: ['', [Validators.required]], 
            dateparcourpro3: ['', [Validators.required]], 
            titleparcourpro3: ['', [Validators.required]], 
            parcourpro3: ['', [Validators.required]], 
            dateparcourpro4: ['', [Validators.required]], 
            titleparcourpro4: ['', [Validators.required]], 
            parcourpro4: ['', [Validators.required]], 
            dateparcourpro5: ['', [Validators.required]], 
            titleparcourpro5: ['', [Validators.required]], 
            parcourpro5: ['', [Validators.required]], 
            dateparcourpro6: ['', [Validators.required]], 
            titleparcourpro6: ['', [Validators.required]], 
            parcourpro6: ['', [Validators.required]],
            
            photocov: [''], 

          });
      this.route.queryParams.subscribe(params => {
        if ((params as any).editprofile) {
          const editprofile = JSON.parse((params as any).editprofile);
          // Set form values with user data
          this.profileForm.patchValue({
            id: editprofile.id,
            name:editprofile.name,
            lastname:editprofile.lastname,
            datebirth:editprofile.datebirth,
            adress:editprofile.adress,
            gender:editprofile.gender,
            phone:editprofile.phone,
            status:editprofile.status,
            photo: editprofile.photo,
            datestage1: editprofile.datestage1,
            titlestage1: editprofile.titlestage1,
            stage1: editprofile.stage1,
            datestage2: editprofile.datestage2,
            titlestage2: editprofile.titlestage2,
            stage2: editprofile.stage2,
            datestage3: editprofile.datestage3,
            titlestage3: editprofile.titlestage3,
            stage3: editprofile.stage3,
            datestage4: editprofile.datestage4,
            titlestage4: editprofile.titlestage4,
            stage4: editprofile.stage4,
            datestage5: editprofile.datestage5,
            titlestage5: editprofile.titlestage5,
            stage5: editprofile.stage5,
            datestage6: editprofile.datestage6,
            titlestage6: editprofile.titlestage6,
            stage6: editprofile.stage6,
            dateparcourpro1 : editprofile.dateparcourpro1 ,
            titleparcourpro1: editprofile.titleparcourpro1,
            parcourpro1: editprofile.parcourpro1,
            dateparcourpro2 : editprofile.dateparcourpro2 ,
            titleparcourpro2: editprofile.titleparcourpro2,
            parcourpro2: editprofile.parcourpro2,
            dateparcourpro3 : editprofile.dateparcourpro3 ,
            titleparcourpro3: editprofile.titleparcourpro3,
            parcourpro3: editprofile.parcourpro3,
            dateparcourpro4 : editprofile.dateparcourpro4,
            titleparcourpro4: editprofile.titleparcourpro4,
            parcourpro4: editprofile.parcourpro4,
            dateparcourpro5 : editprofile.dateparcourpro5,
            titleparcourpro5: editprofile.titleparcourpro5,
            parcourpro5: editprofile.parcourpro5,
            dateparcourpro6 : editprofile.dateparcourpro6,
            titleparcourpro6: editprofile.titleparcourpro6,
            parcourpro6: editprofile.parcourpro6,
            photocov: editprofile.photocov,
            // date_of_birth: editprofile.date_of_birth,
            // linkedin: editprofile.linkedin,
            // git_hub: editprofile.git_hub,
            // headline: editprofile.headline,
           
          });
          const photoPath = this.authservice.PhotoUrl + editprofile.photo;
          const photoCovPath = this.authservice.PhotoUrl + editprofile.photocov;
          this.displayUploadedphoto(photoPath);
          this.displayUploadedphotoCov(photoCovPath);
    
  
          
        
        }
      });
    });
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
       
        this.profileForm.patchValue({ photo: this.photo });
        this.PhotoFilePath = this.authservice.PhotoUrl + this.photo;
      });
    } 
    uploadPhoto2(event) {
      const file = event.target.files[0];
      const formData: FormData = new FormData();
      formData.append('uploadedFile', file);
      this.authservice.uplodephoto2(formData).subscribe((data: any) => {
        this.photocov = data.toString();
       
        this.profileForm.patchValue({ photocov: this.photocov });
        this.PhotoFilePath2 = this.authservice.PhotoUrl2 + this.photocov;
      });
    } 
    displayUploadedphoto(path: any): void {
      if (path) {
      
        this.PhotoFilePath = path;
      }
    }
  
    displayUploadedphotoCov(path: any): void {
      if (path) {
      
        this.PhotoFilePath2 = path;
      }
    }
    update_profile(id :any) {
  
      const updatedData = this.profileForm.value;
      debugger
      this.authservice.update_profile(updatedData).subscribe(
        res => {
         
    console.log(id)
    
          Swal.fire({    
            icon: 'success',
            title: 'Success',
            text: 'Update In successfully.',        
        })   
        },
      );
    } 
    back(){

      this.router.navigate(["/profile/user-profile" ])
    }
    
}
