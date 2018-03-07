import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';

@Injectable()
export class GuestGuard implements CanActivate {


    constructor(public auth: NbAuthService, public router: Router) {}
  canActivate(): boolean {
      const user = this.auth.getData();
      const char = user.charAt(1);
    console.log('to---', char);
    if (!this.auth.isAuthenticated() && char !== 'G') {
    //   this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
    // canActive can return Observable<boolean>, which is exactly what isAuhenticated returns

}