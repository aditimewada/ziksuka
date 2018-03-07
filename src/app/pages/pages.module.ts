import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { QuizModule } from './quizComp/quizComp.module';
import {TablesComponent} from './administrator/tables.component';
import {DemoModule} from './studentCalender/plunk.module';
import {SelectiveModule} from './selective/selective.module';
// import {ContentModule} from './contents/contents.module';
// import { DemoModule } from './calendar/calendar.module';
// import { CalendarModule } from 'angular-calendar';
// import {CalendarComponent} from './calendar/calendar.component';
// import { RouterModule, Routes } from '@angular/router';
// import {routes } from './pages-routing.module';
import {StaticModule} from './static/static.module';
import { AuthGuard } from './auth-guard.service';
// import {NbRegisterComponent} from '@Nebular/auth';
import { TeacherGuard } from './teacher-guard.service';
import { StudentGuard } from './student-guard.service';
import { GuestGuard } from './guest-guard.service';
import { ProfileService } from './profile.service';
import {HeaderService} from './header.service';

const PAGES_COMPONENTS = [
  PagesComponent,
  // CalendarComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    QuizModule,
    SelectiveModule,
    StaticModule,
    // TablesComponent,
    DemoModule,
    // CalendarModule.forRoot( ),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [AuthGuard, StudentGuard, TeacherGuard, GuestGuard, ProfileService, HeaderService],
})
export class PagesModule {
}
