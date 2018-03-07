import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(public auth: NbAuthService, public router: Router, public profileService: ProfileService) {}
  canActivate(): boolean {
    const user = this.auth.getData();
    // const char = user.charAt(1);
    this.profileService.getProfile().subscribe(data => {
    console.log('Profile', data.class_no);
    localStorage.setItem('class', data.class_no);
    localStorage.setItem('school', data.school);
    localStorage.setItem('std', data.standard);
    localStorage.setItem('username', data.name);
    localStorage.setItem('id', data.user);
});
    console.log('to---', !this.auth.isAuthenticated());
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
    // canActive can return Observable<boolean>, which is exactly what isAuhenticated returns

}
