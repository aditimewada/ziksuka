import { Component, ViewEncapsulation, OnInit } from '@angular/core';
// import { MyCodeService } from '../../../../_services';
import { Router } from '@angular/router';
import {ContentService} from './services/contents.service';
import {Class} from './models/class';
import {Subject} from './models/subject';
import {Book} from './models/book';
import {Chapter} from './models/chapter';
import {Topic} from './models/topic';
import {SubTopic} from './models/sub_topic';
import { SelectiveQuizService } from './services/quiz.service';
import { HelperService } from './services/helper.service';
import { Option, Question, Quiz, QuizConfig } from './models/index';
import { Answer} from '../../selective/models/answer';
import { QuestAnswered} from '../../selective/models/quest_answered';
@Component({
selector: 'ngx-content',
styleUrls: ['./contents.component.scss'],
templateUrl: './contents.html',
encapsulation: ViewEncapsulation.None,
providers: [ContentService, SelectiveQuizService],
})
export class ContentComponent implements OnInit {
    quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  view = 'selected';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none',
  };

  pager = {
    index: 0,
    size: 1,
    count: 1,
  };
    constructor(private contentService: ContentService, private quizService: SelectiveQuizService) {}
    getClass: Class[] = new Array();
    getSubject: Subject[] = new Array();
    getBook: Book[] = new Array();
    getChapter: Chapter[] = new Array();
    getTopic: Topic[] = new Array();
    getSubTopic: SubTopic[] = new Array();
    selectedSubject: Subject;
    selectedBook: Book;
    selectedChapter: Chapter;
    selectedTopic: Topic;
    selectedSubTopic: SubTopic;
    url;
    answerResp = new Answer();
  quest_ans: QuestAnswered[] = new Array();
  date;
  startDate;

    ngOnInit() {
    // this.quizes = this.quizService.getAll();
    this.contentService.getContents().subscribe(data => {this.getClass.push(data);
    //   this.pager.count = this.quiz.questions.length;
    console.log(this.getClass);
});
// this.getContent();

}
getContent() {
    console.log(this.getClass);
    // this.getSubject = this.getClass.id;
    this.getClass.forEach(Element => {this.getSubject = Element[0].subjects;
    console.log('ele', Element[0]);
console.log('sub', this.getSubject); });
    console.log(this.selectedSubject.books);
    this.getBook = this.selectedSubject.books;
    console.log(this.selectedBook);
    this.getChapter = this.selectedBook.chapters;
    this.getTopic = this.selectedChapter.topics;
    this.getSubTopic = this.selectedTopic.subtopics;
    // return this.getSubject;
}
start() {
    // console.log(this.selectedBook.id);
    // console.log(this.selectedSubject.id);
    // console.log(this.selectedChapter.id);
    // console.log(this.selectedTopic.id);
    // console.log(this.selectedSubTopic.id);
    this.url = 'http://127.0.0.1:8000/learning/random_test_dynamic/' + +localStorage.getItem('school') +
    '/' + +localStorage.getItem('class') + '/' + +localStorage.getItem('std') + '/' +
    this.selectedSubject.id + '/' + this.selectedBook.id + '/' + this.selectedChapter.id + '/'
    + this.selectedTopic.id + '/' + this.selectedSubTopic.id + '/1/';
    console.log(this.url);
    this.quizService.getQuest(this.url).subscribe(data => {this.quiz = new Quiz(data);
      this.pager.count = this.quiz.questions.length;
    });
     this.view = 'quiz';
     console.log('quiz', this.quiz);
      this.startDate = new Date();
}

get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
    this.date =  new Date();
       const quest = (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
      quest[0].start_time = this.date;
      console.log(quest[0].start_time);
      const prev = (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index - 1, this.pager.index - 1 + this.pager.size) : [];
      prev[0].end_time = this.date;
      console.log(prev[0].end_time);
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  }

  temp;
  selected_option(question) {
    // console.log(question);
        // question.options.forEach((x) => {if ( x.selected === true)  this.temp = x.option_text;
        //  } );
         question.options.forEach((x) => {if ( x.selected === true)  this.temp = x.option_text;
         } );
         return this.temp;
  }

  i = 0;
  onSubmit() {
    const answers = [];
    const endDate =  new Date();
       const start = (this.quiz.questions) ?
     this.quiz.questions.slice(0, 0 + this.pager.size) : [];
      start[0].start_time = this.startDate;
      console.log('start', this.pager.count);
      const end = (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.count - 1, this.pager.count - 1 + this.pager.size) : [];
      end[0].end_time = endDate;
    this.quiz.questions.forEach(x => {
     const result = this.isCorrect(x) === 'correct' ? 'correct' : 'incorrect';
     if (result === 'correct') this.i = this.i + 1;
     const opt = this.selected_option(x);
      this.quest_ans.push(
      {'question_id': x.id,  'quest_start_time' : x.start_time, 'quest_end_time' : x.end_time,
      'selected_option': opt , 'result': result });
    });
    console.log('quest', this.quest_ans);
    const score = (this.quiz.max_score / this.pager.count) * this.i;
    this.answerResp.student_id = +localStorage.getItem('id');
    this.answerResp.a_test_id = null;
    this.answerResp.na_test_id = null;
    this.answerResp.s_test_id = this.quiz.id;
    this.answerResp.test_start_time = this.startDate;
    this.answerResp.test_end_time = endDate;
    this.answerResp.total_score = score;
    this.answerResp.answer = this.quest_ans;
console.log('i', this.answerResp);
this.quizService.answer(this.answerResp)
   .subscribe(data => console.log(data),
  error => alert(error),
 );

    // Post your data to the server here. answers contains the questionId and the users' answer.
    // console.log(this.quiz.questions);
    // console.log('Ans', answers);

    this.mode = 'result';
  }
}



