import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';

@Injectable()
export class TeacherGuard implements CanActivate {


    constructor(public auth: NbAuthService, public router: Router) {}
  canActivate(): boolean {
    const user = this.auth.getData();
      const char = user.charAt(1);
    console.log('teacher    ', !this.auth.isAuthenticated() && char !== 'T');
    if (this.auth.isAuthenticated() && char === 'T') {
      // this.router.navigate(['/demo/echarts']);
      return true;
    }
    return false;
  }
    // canActive can return Observable<boolean>, which is exactly what isAuhenticated returns

}