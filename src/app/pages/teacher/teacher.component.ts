import { Component } from '@angular/core';
import { TEACHERS  } from './teacher-menu';

@Component({
  selector: 'ngx-tables',
  template: `<ngx-sample-layout>
      <nb-menu [items]= "menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>`,
})
export class TeacherComponent {
    menu = TEACHERS;
}
