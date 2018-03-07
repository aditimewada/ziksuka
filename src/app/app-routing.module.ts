import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {TablesComponent} from './pages/administrator/tables.component';
import {SchoolComponent} from './pages/administrator/schools/smart-table.component';
import {SelectiveComponent} from './pages/registration/selective.component';
import { AuthGuard } from './pages/auth-guard.service';
import {TeacherGuard} from './pages/teacher-guard.service';
import {StudentGuard} from './pages/student-guard.service';

const routes: Routes = [
  { path: 'pages',
  canActivate: [AuthGuard, StudentGuard],
   loadChildren: 'app/pages/pages.module#PagesModule' },
   {
     path: 'teacher',
  canActivate: [AuthGuard, TeacherGuard],
   loadChildren: 'app/pages/teacher/teacher.module#TeacherModule'},
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
     path: 'register',
        canActivate: [AuthGuard],
        component: NbRegisterComponent,
    // component: DemoComponent,
  },
  {
        path: 'register-test',
        canActivate: [AuthGuard],
        component: SelectiveComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
