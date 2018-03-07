import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';
import { NbAuthService} from '@nebular/auth';
// import {Router} from '@angular/router';

@Injectable()
export class HeaderService {


    constructor(public auth: NbAuthService) {}
  getToken(): String {
    console.log('to---', this.auth.getTokenName());
    const token = this.auth.getTokenName();
    return token;
  }
    // canActive can return Observable<boolean>, which is exactly what isAuhenticated returns
}
