import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../../@theme/theme.module';

import { EditorsRoutingModule, routedComponents } from './editors-routing.module';
import {HeaderService} from '../../header.service';

@NgModule({
  imports: [
    ThemeModule,
    EditorsRoutingModule,
    CKEditorModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [HeaderService],
})
export class EditorsModule { }
