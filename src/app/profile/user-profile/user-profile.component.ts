import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthserviceService } from 'src/app/authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  constructor(   public router: Router,    public httpClient: HttpClient,private _router: Router,
    public authservice: AuthserviceService,
    private route: ActivatedRoute ){

  }
  PhotoUrl ="http://localhost:44315/photo";
  PhotoUrl2 ="http://localhost:44315/photo";
  profile:any
  Email:any
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        const email = params['email'];
        this.authservice.setEmail(email);
       
      }
      this.authservice.getEmail().then(email => {
        // Log email inside the promise
            this.Email = email;
      })
      this.profilelist()
    });}
    profilelist() {

      this.authservice.getusers().subscribe(data=>{
        debugger
        this.profile = data.filter(users=> users.email === this.Email);
        console.log("l",this.profile)
      }
      )
    }
  Updateprofile(Id: string) {
    this.authservice.getusers().subscribe(data => {
      const editprofile = data.filter(editprofile=> editprofile.id === Id)[0];
      this._router.navigate(['/profile/edit-user-profile'], { queryParams: { id:Id,editprofile: JSON.stringify(editprofile) } });
    });
  }
 
  
routertoedit(){

  this.router.navigate(["/profile/edit-user-profile" ])
}
}
