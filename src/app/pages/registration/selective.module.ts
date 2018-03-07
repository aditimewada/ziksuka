import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SelectiveComponent } from './selective.component';
import { RegisterQuizComponent } from './quiz/selectiveQuiz.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SelectiveComponent,
    RegisterQuizComponent,
  ],
  imports: [
    // BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [SelectiveComponent],
})
export class SelectiveModule { }
