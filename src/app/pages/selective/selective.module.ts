import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SelectiveComponent } from './selective.component';
import { SelectiveQuizComponent } from './quiz/selectiveQuiz.component';
import { CommonModule } from '@angular/common';
import {HeaderService} from '../header.service';

@NgModule({
  declarations: [
    SelectiveComponent,
    SelectiveQuizComponent,
  ],
  imports: [
    // BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
  ],
  providers: [HeaderService],
  bootstrap: [SelectiveComponent],
})
export class SelectiveModule { }
