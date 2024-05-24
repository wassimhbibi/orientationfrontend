import { Component, OnInit } from '@angular/core';
import { AppIcon } from './app-icon';
import { SidebarService } from './../sidebar/sidebar.service'
import { AuthserviceService } from 'src/app/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
Notification2: any;

  constructor( public sidebarservice: SidebarService ,public router: Router,   private route: ActivatedRoute,     public authservice: AuthserviceService,) {

  }
  ListQuiz:any
  ListResponce:any
  PhotoUrl ="http://localhost:44315/photo";
  theme_name = 'dark_mode'
profile:any;
Email:any
  toggleSearch: boolean = false;

  darkMode() {
    
    if(this.theme_name == 'light_mode' ) {
      document.querySelector("html").classList.replace('dark_mode' , 'light_mode');
      this.theme_name = 'dark_mode'
      
    } else if(this.theme_name == 'dark_mode' ) {
      document.querySelector("html").classList.replace('light_mode' , 'dark_mode');
      this.theme_name = 'light_mode'

    }
     return this.theme_name;
  }
 

  getSideBarSate() {
    return this.sidebarservice.getSidebarState();
  }
  
  logout() {

    sessionStorage.clear();
      this.router.navigate(['/auth/cover-signin']);
 
}
  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }






  
speciality:any
  intervalSubscription!: Subscription;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        const email = params['email'];
        this.authservice.setEmail(email);
       
     
    this.authservice.getEmail().then(email => {
      // Log email inside the promise
          this.Email = email;
    })
    this.profilelist()
    this.intervalSubscription = interval(500).subscribe(() => {
      this.GetQuiz() ;
      this.GetResponce();
    });

 
  this.authservice.getusers().subscribe(data=>{
    const a=data.find(a=> a.email===this.Email)
 this.speciality=a["speciality"]  
  })
}})
  }

  GetQuiz() {
 
    this.authservice.getQuiz().subscribe(data=>{
      
      this.ListQuiz = data.filter(q=> q.speciality === this.speciality &&q.emailUserRequest!=this.Email);
   
    }
    )
    return this.ListQuiz
  }
  GetResponce() {

    this.authservice.getResponce().subscribe(data=>{

      this.ListResponce = data.filter(q=> q.emailUserRequest === this.Email && q.emailUserResponse!=null);
   console.log("listffffffffffffffff",this.ListResponce)
    }
    )
    return this.ListResponce
  }
  showquiz(id:any){
    this.router.navigate(['/pricing/showquiz'],{queryParams:{id:id}})
  }
  showResponce(id:any){
    this.router.navigate(['/faq/Responce'],{queryParams:{id:id}})
  }
  profilelist() {

    this.authservice.getusers().subscribe(data=>{

      this.profile = data.filter(users=> users.email === this.Email);
      console.log("l",this.profile)
    }
    )
  }
  profilee(){
    this.router.navigate(['/profile/user-profile'])
  }
}