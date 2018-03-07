import { Component, OnInit } from '@angular/core';
import {Subject} from '../../tables/contents/models/subject';
import {Book} from '../../tables/contents/models/book';
import { Class} from '../../tables/contents/models/class';
import {ChartService} from './services/echarts.service';
import {Chart} from './models/chart';

@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
  providers: [ChartService],
})
export class EchartsComponent implements OnInit {
    getClass: Class[] = new Array();
  getSubject: Subject[] = new Array();
    getBook: Book[] = new Array();
    selectedSubject: Subject;
    selectedBook: Book;

    constructor(private chartService: ChartService) {
  }
  chart: Chart;
  url;
  view = 'selected';

  ngOnInit() {
    // this.quizes = this.quizService.getAll();
    this.chartService.getContents().subscribe(data => {this.getClass.push(data);
    //   this.pager.count = this.quiz.questions.length;
    console.log(this.getClass);
    this.getCon();
});
  }
  getCon() {
    console.log(this.getClass);
    // this.getSubject = this.getClass.id;
    this.getClass.forEach(Element => {this.getSubject = Element[0].subjects;
    console.log('ele', Element[0]);
console.log('sub', this.getSubject); });
    console.log(this.selectedSubject.books);
    this.getBook = this.selectedSubject.books;
    console.log(this.selectedBook);
    // this.getChapter = this.selectedBook.chapters;
    // this.getTopic = this.selectedChapter.topics;
    // this.getSubTopic = this.selectedTopic.subtopics;
    // return this.getSubject;
}
  start() {
    // console.log(this.selectedBook.id);
    // console.log(this.selectedSubject.id);
    // console.log(this.selectedChapter.id);
    // console.log(this.selectedTopic.id);
    // console.log(this.selectedSubTopic.id);
    this.url = 'http://127.0.0.1:8000/learning/bar_chart/' + +localStorage.getItem('school') +
    '/' + +localStorage.getItem('class') + '/' + +localStorage.getItem('std') + '/' +
    this.selectedSubject.id + '/' + this.selectedBook.id + '/';
    console.log(this.url);
    localStorage.setItem('url', this.url);
  //  this.chartService.getChart(this.url).subscribe(data => {
  //   this.chart = new Chart(data);
  //   // this.data(this.chart);
  //   console.log('chart', this.chart);
  // });
     this.view = 'chart';
      // this.date =  new Date();
      // console.log('start', this.date);
}
}
