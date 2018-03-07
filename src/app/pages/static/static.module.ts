import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { QuizCompComponent } from './quizComp.component';
import { StaticComponent } from './static.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    StaticComponent,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [StaticComponent],
})
export class StaticModule { }