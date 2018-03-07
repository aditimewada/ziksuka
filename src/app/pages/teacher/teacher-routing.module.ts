import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TeacherComponent } from './teacher.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import {QuizCompComponent } from './quizComp/quizComp.component';
// import {TablesComponent} from './administrator/tables.component';
import {DemoComponent} from './plunk/plunk.component';
// import {SelectiveComponent} from './selective/selective.component';
// import {ContentComponent} from './contents/contents.component';
// import {CalendarComponent } from './calendar/calendar.component';
// import {StaticComponent} from './static/static.component';
import { AuthGuard } from '../auth-guard.service';
// import {NbRegisterComponent} from '@Nebular/auth';
import { TeacherGuard } from '../teacher-guard.service';
// import { StudentGuard } from '../student-guard.service';
// import { GuestGuard } from '../guest-guard.service';


// const students: Routes = [{
//   // path: '',
//   path: '',
//   component: PagesComponent,
//   canActivate: [StudentGuard],
//   children: [{
//     path: 'dashboard',
//     // component: StaticComponent,
//     component: SelectiveComponent,
//     // component: QuizCompComponent,
//     // component: DemoComponent,
//   },
//   {
//     path: 'ui-features',
//     // canActivate: [StudentGuard],
//     loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
//   }, {
//     path: 'components',
//     canActivate: [AuthGuard, StudentGuard],
//     loadChildren: './components/components.module#ComponentsModule',
//   }, {
//     path: 'maps',
//     canActivate: [AuthGuard, StudentGuard],
//     loadChildren: './maps/maps.module#MapsModule',
//   }, {
//     path: 'charts',
//     canActivate: [AuthGuard, StudentGuard],
//     loadChildren: './charts/charts.module#ChartsModule',
//   }, {
//     path: 'editors',
//     // canActivate: [AuthGuard, StudentGuard],
//     loadChildren: './editors/editors.module#EditorsModule',
//   }, {
//     path: 'forms',
//     loadChildren: './forms/forms.module#FormsModule',
//   },
//    {
//     path: 'tables',
//     canActivate: [AuthGuard, StudentGuard],
//     loadChildren: './tables/tables.module#TablesModule',
//   },
// //    {
// //   path: 'admin',
// //   loadChildren: './administrator/tables.module#TablesModule',
// // },
//  {
//     path: '',
//     canActivate: [AuthGuard, StudentGuard],
//     redirectTo: 'dashboard',
//     pathMatch: 'full',
//   },
//   {
//     path: 'contents',
//     canActivate: [AuthGuard, StudentGuard],
//     redirectTo: 'contents',
//     pathMatch: 'full',
//   }],
//   // path: '',
// },
// {
//   // path: '',
//   path: '',
//   canActivate: [TeacherGuard],
//   component: PagesComponent,
//   children: [{
//     path: 'dashboard',
//     component: DemoComponent,
//     // component: DemoComponent,
//   },
//   {
//     path: 'ui-features',
//     loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
//   }, {
//     path: 'components',
//     loadChildren: './components/components.module#ComponentsModule',
//   }, {
//     path: 'maps',
//     loadChildren: './maps/maps.module#MapsModule',
//   }, {
//     path: 'charts',
//     loadChildren: './charts/charts.module#ChartsModule',
//   }, {
//     path: 'editors',
//     loadChildren: './editors/editors.module#EditorsModule',
//   },
//    {
//     path: 'forms',
//     loadChildren: './forms/forms.module#FormsModule',
//   },
//   //  {
//   //   path: 'tables',
//   //   loadChildren: './tables/tables.module#TablesModule',
//   // },
// //    {
// //   path: 'admin',
// //   loadChildren: './administrator/tables.module#TablesModule',
// // },
//  {
//     path: '',
//     redirectTo: 'dashboard',
//     // pathMatch: 'full',
//   }],
//   // path: '',
// }];

// const admin: Routes = [{
//   // path: '',
//   path: '',
//   component: PagesComponent,
//   children: [
//     // {
//   //   path: 'dashboard',
//   //   component: QuizCompComponent,
//   // }, {
//   //   path: 'ui-features',
//   //   loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
//   // }, {
//   //   path: 'components',
//   //   loadChildren: './components/components.module#ComponentsModule',
//   // }, {
//   //   path: 'maps',
//   //   loadChildren: './maps/maps.module#MapsModule',
//   // }, {
//   //   path: 'charts',
//   //   loadChildren: './charts/charts.module#ChartsModule',
//   // }, {
//   //   path: 'editors',
//   //   loadChildren: './editors/editors.module#EditorsModule',
//   // }, {
//   //   path: 'forms',
//   //   loadChildren: './forms/forms.module#FormsModule',
//   // }, {
//   //   path: 'tables',
//   //   loadChildren: './tables/tables.module#TablesModule',
//   // },
//    {
//   path: 'admin',
//   loadChildren: './administrator/tables.module#TablesModule',
// },
//  {
//     path: '',
//     redirectTo: 'admin',
//     // pathMatch: 'full',
//   }],
//   // path: '',
// }];

const teachers: Routes = [{
  // path: '',
  path: '',
  canActivate: [TeacherGuard],
  component: TeacherComponent,
  children: [{
    path: 'dashboard',
    component: DemoComponent,
    // component: DemoComponent,
  },
//   {
//     path: 'ui-features',
//     loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
//   },
//   {
//     path: 'components',
//     loadChildren: './components/components.module#ComponentsModule',
//   },
//   {
//     path: 'maps',
//     loadChildren: './maps/maps.module#MapsModule',
//   },
  {
    path: 'charts',
    loadChildren: '../charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  },
//    {
//     path: 'forms',
//     loadChildren: './forms/forms.module#FormsModule',
//   },
  //  {
  //   path: 'tables',
  //   loadChildren: './tables/tables.module#TablesModule',
  // },
//    {
//   path: 'admin',
//   loadChildren: './administrator/tables.module#TablesModule',
// },
 {
    path: '',
    redirectTo: 'dashboard',
    // pathMatch: 'full',
  }],
  // path: '',
}];

// this.id = 'student';
// this.temp = students;
// console.log('id', this.id);
// console.log('this id', this.id);
// if ( this.id === 'admin') {
//   this.temp = admin;
//   console.log(this.temp);

// }else if ( this.id === 'teacher') {
//    this.temp = teachers;
// }else {
//   this.temp = students;
// }
// const demo = this.temp;
@NgModule({
  imports: [RouterModule.forChild(teachers)],
  exports: [RouterModule],
})

export class TeacherRoutingModule {
}
