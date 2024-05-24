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
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, MatModule,  MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

  Email:any
  PhotoUrl ="http://localhost:44315/photo";
   PhotoFilePath:any;
   photo:string="";

  quizForm: FormGroup;
 
   
  constructor(
    public httpClient: HttpClient,
    public authservice: AuthserviceService,
    private _router: Router,private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    public router: Router, 
  ) {

  }

  ngOnInit() {
    this.authservice.getEmail().then(email => {
      // Log email inside the promise
          this.Email = email;
          this.quizForm= this.fb.group({
            id:[null],
            speciality: ['', [Validators.required]], 
            question: ['', [Validators.required]], 
            photo: [''], 
            choix1: ['', [Validators.required]],
            choix2:['', [Validators.required]],
            choix3: ['', [Validators.required]], 
            emailUserRequest:[this.Email]
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
       
        this. quizForm.patchValue({ photo: this.photo });
        this.PhotoFilePath = this.authservice.PhotoUrl + this.photo;
      });
    } 

    displayUploadedphoto(path: any): void {
      if (path) {
      
        this.PhotoFilePath = path;
      }
    }
    addquiz(): void
    {
         this.authservice.addquiz(this.quizForm.value).subscribe(responce => {
                    if (responce ) {       
               }
                        });

                       Swal.fire({
                        title: 'Success!',
                        text: 'You have successfully add Quiz .',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });
                }
    back(){

      this.router.navigate(["/profile/user-profile" ])
    }
    
}
