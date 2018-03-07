import { Component, OnInit } from '@angular/core';

import { TEACHERS } from './pages-menu';
import { STUDENTS } from './pages-menu';
import { ADMIN } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
//  id = 'teacher';
 menu = STUDENTS;
  // demo1(): Array<object> {
  // // this.menu1 = MENU_ITEMS;
  // if (this.id === 'admin') {
  //   return ADMIN;
  // }else if (this.id === 'teacher') {
  //   return TEACHERS;
  // }else {
  //   return STUDENTS;
  // }
  // }
//   menu;
//   demo() {
//   if (this.id === 999) {
//     this.menu = MENU_ITEMS;
//   }else {
//     this.menu = MENU_ITEMS1;
//   }
//   console.log(this.menu);
// }



}
