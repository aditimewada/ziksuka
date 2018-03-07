/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TablesComponent} from './pages/administrator/tables.component';
import {SchoolComponent} from './pages/administrator/schools/smart-table.component';
import {NbAuthModule, NbEmailPassAuthProvider} from '@nebular/auth';
import {SelectiveModule} from './pages/registration/selective.module';
import { AuthGuard } from './pages/auth-guard.service';
import { NB_AUTH_TOKEN_WRAPPER_TOKEN, NbAuthJWTToken  } from '@nebular/auth';
import {TeacherGuard} from './pages/teacher-guard.service';
import {StudentGuard} from './pages/student-guard.service';
import {ProfileService} from './pages/profile.service';
import {HeaderService} from './pages/header.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    SelectiveModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
         providers: {
           email: {
             service: NbEmailPassAuthProvider,
            //  config: {
            //        token: {
            //      key: 'token', // this parameter tells Nebular where to look for the token
            //    },
            //  },
           },
         },
         forms: {},
       }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useValue: NbAuthJWTToken },
    AuthGuard,
    TeacherGuard,
    StudentGuard,
    ProfileService,
    HeaderService,
  ],
})
export class AppModule {
}
