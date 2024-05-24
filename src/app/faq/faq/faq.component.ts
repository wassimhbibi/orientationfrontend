import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  imports: [CommonModule, MatModule],
})
export class FaqComponent implements OnInit {

  panelOpenState = false;

  constructor(  public authservice: AuthserviceService,private route: ActivatedRoute) { }
Email:any
id:any
a:any
intervalSubscription!: Subscription;
Listuser :any
Listresponce:any
PhotoUrl ="http://localhost:44315/photo";
  ngOnInit(): void {
    this.authservice.getEmail().then(email => {
      // Log email inside the promise
          this.Email = email;
        
          this.authservice.getQuiz().subscribe(data=>{
      
            this.Listresponce = data.find(q=> q.id === this.id);
            this.a=this.Listresponce['emailUserResponse']})
            this.intervalSubscription = interval(500).subscribe(() => {
            this.authservice.getusers().subscribe(data=>{
        
              this.Listuser = data.filter(q=> q.email === this.a);
              console.log("list user : ",this.Listuser)})})
    this.route.queryParams.subscribe(params => {
      if ((params as any).id) {
        this.id= JSON.parse((params as any).id);
        this.GetResponce() 
        
        
   
    
        console.log("ho",this.GetResponce())

        // Set form values with user data
       } })})
}



 GetResponce() {

    this.authservice.getQuiz().subscribe(data=>{
      debugger
      this.Listresponce = data.filter(q=> q.id === this.id);
   
    }
    )
    return this.Listresponce
  }
  // getuser(){
  // this.authservice.getusers().subscribe(data=>{
  //   debugger
  //   this.Listuser = data.filter(q=> q.email === this.a);
  //   console.log("list user : ",this.Listuser)
  // }) 
  // }

}
