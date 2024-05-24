import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { AuthserviceService } from 'src/app/authservice.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, MatModule,FormsModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  constructor(
    public httpClient: HttpClient,
    public authservice: AuthserviceService,private route: ActivatedRoute){}
    Email:any
    intervalSubscription!: Subscription;
    id:any
  ngOnInit() {
    this.authservice.getEmail().then(email => {
      // Log email inside the promise
          this.Email = email;
         
      
     
    this.route.queryParams.subscribe(params => {
      if ((params as any).id) {
        this.id= JSON.parse((params as any).id);
        this.GetQuiz() ;
        // Set form values with user data
       } })})
}



ListQuiz:any
 GetQuiz() {

    this.authservice.getQuiz().subscribe(data=>{
      
      this.ListQuiz = data.filter(q=> q.id === this.id);
      console.log("list quiz : ",this.ListQuiz)
    }
    )
    return this.ListQuiz
  }


  QuizResponse(question: any, emailRequest: any, iinputChoice: any, selectedChoice: any) {
debugger
    
    const existingData = this.GetQuiz().find(e => e.question === question && e.emailUserRequest === emailRequest);
    const newEntry = {
      ...existingData,
      inputChoix: iinputChoice,
      emailUserResponse: this.Email,
      CheckedChoix: selectedChoice 
    };
  
    this.authservice.QuizResponse(newEntry).subscribe(res => {
      console.log(res);
      Swal.fire({    
        icon: 'success',
        title: 'Success',
        text: 'Add In successfully.',        
    })   
    });
  }
  
}
