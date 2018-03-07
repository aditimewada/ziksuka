import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { PrincipalComponent } from './principals/smart-table.component';
import { SchoolComponent } from './schools/smart-table.component';
import { TeacherComponent } from './teachers/smart-table.component';
import { StudentComponent } from './students/smart-table.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [{
    path: 'schools',
    component: SchoolComponent,
  }, {
    path: 'principals',
    component: PrincipalComponent,
  }, {
    path: 'teachers',
    component: TeacherComponent,
  }, {
    path: 'students',
    component: StudentComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  PrincipalComponent,
  SchoolComponent,
  TeacherComponent,
  StudentComponent,
];
