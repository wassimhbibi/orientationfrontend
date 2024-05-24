import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthserviceService } from './authservice.service';

export class authGuard{
  
  constructor(private authService: AuthserviceService, private router: Router) { }
  
  canActivate(route:ActivatedRouteSnapshot ,state: RouterStateSnapshot):boolean{

    if(this.authService.isloggedin){
 return this.authService.isloggedin;

    }else{     
        this.router.navigate([''])
        return false;
    }
 
}}
  

