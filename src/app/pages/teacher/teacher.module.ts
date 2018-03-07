import { NgModule } from '@angular/core';

import { TeacherComponent } from './teacher.component';
// import { DashboardModule } from './dashboard/dashboard.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
// import { QuizModule } from './quizComp/quizComp.module';
// import {TablesComponent} from './administrator/tables.component';
import {DemoModule} from './plunk/plunk.module';
// import {SelectiveModule} from './selective/selective.module';
// import {ContentModule} from './contents/contents.module';
// import { DemoModule } from './calendar/calendar.module';
// import { CalendarModule } from 'angular-calendar';
// import {CalendarComponent} from './calendar/calendar.component';
// import { RouterModule, Routes } from '@angular/router';
// import {routes } from './pages-routing.module';
// import {StaticModule} from './static/static.module';
import { AuthGuard } from '../auth-guard.service';
// import {NbRegisterComponent} from '@Nebular/auth';
import { TeacherGuard } from '../teacher-guard.service';
// import { StudentGuard } from './student-guard.service';
// import { GuestGuard } from './guest-guard.service';

const TEACHER_COMPONENTS = [
  TeacherComponent,
  // CalendarComponent,
];

@NgModule({
  imports: [
    TeacherRoutingModule,
    ThemeModule,
    // DashboardModule,
    // QuizModule,
    DemoModule,
    // SelectiveModule,
    // StaticModule,
    // TablesComponent,
    // DemoModule,
    // CalendarModule.forRoot( ),
  ],
  declarations: [
    ...TEACHER_COMPONENTS,
  ],
  providers: [AuthGuard, TeacherGuard],
})
export class TeacherModule {
}
