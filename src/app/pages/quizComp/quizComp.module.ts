import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { QuizCompComponent } from './quizComp.component';
import { QuizComponent } from './quiz/quiz.component';
import { CommonModule } from '@angular/common';
import {HeaderService} from '../header.service';

@NgModule({
  declarations: [
    QuizCompComponent,
    QuizComponent,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  providers: [HeaderService],
  bootstrap: [QuizCompComponent],
})
export class QuizModule { }
