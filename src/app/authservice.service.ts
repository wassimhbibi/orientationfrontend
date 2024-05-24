import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private _httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  readonly APIUrl='http://localhost:44315/api';
  readonly PhotoUrl = "http://localhost:44315/photo";
  readonly PhotoUrl2 = "http://localhost:44315/photo";
  Rech(credentials: any){
    return this._httpClient.post(this.APIUrl+'/login', credentials)
}
getusers():Observable<any[]>{
  return this._httpClient.get<any>(this.APIUrl+'/SiginUp')
}
requestPasswordReset(email: string): Observable<any> {
  const requestBody = { email: email };

  return this._httpClient.post(`${this.APIUrl}/login/forgotpassword`, requestBody);
}
resetPasswordd(token: any, newPassword: any): Observable<any> {
  const resetPasswordData = {
      FoPasModel: { resetToken: token },
      UsersModel: { password: newPassword }
  };



  return this._httpClient.post(`${this.APIUrl}/login/UpdateUserPassword`, resetPasswordData);
}
signUp(user:any): Observable<object> {
  return this._httpClient.post(this.APIUrl + '/SiginUp', user);
}
addquiz(user:any): Observable<object> {
  return this._httpClient.post(this.APIUrl + '/quiz', user);
}
update_profile(val:any) {
  return this._httpClient.put(this.APIUrl+'/SiginUp',val)
}
verifAccount(val:any){
  return this._httpClient.post(this.APIUrl+'/SiginUp/VerifAccount',val)
}

uplodephoto(val:object){
  return this._httpClient.post(this.APIUrl+'/SiginUp/SaveFile',val)
}
uplodephoto2(val:object){
  return this._httpClient.post(this.APIUrl+'/SiginUp/SaveFile2',val)
}
 // Get the email 

 private userEmailKey = 'userEmail';

 setEmail(email: string): void {
   sessionStorage.setItem(this.userEmailKey, email); // Store email in localStorage
}
getEmail(): Promise<any> {
   return new Promise<any>((resolve) => {
           const email = sessionStorage.getItem(this.userEmailKey); // Retrieve email from localStorage
           resolve(email)
   });
}
QuizResponse(user:any): Observable<object> {
  return this._httpClient.post(this.APIUrl + '/Responce', user);
}
getQuiz():Observable<any[]>{
  return this._httpClient.get<any>(this.APIUrl+'/Responce')
}
getResponce():Observable<any[]>{
  return this._httpClient.get<any>(this.APIUrl+'/Quiz')
}
public  loginstat=false
setloggedin(value:boolean){
  
  this.loginstat=value

}

get isloggedin(){

  return this.loginstat
}
}
