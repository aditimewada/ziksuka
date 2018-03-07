import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {QuestionService} from './services/editor.service';
import {QuestionPost} from './models/question';
import {QuestionType} from './models/question_type';
import {OptionPost} from './models/option';
import {Class} from './models/class';
import {BookSubject} from './models/subject';
import {Book} from './models/book';
import {Chapter} from './models/chapter';
import {Topic} from './models/topic';
import {SubTopic} from './models/sub_topic';
import {Question, Quiz, QuizConfig } from '../../../tables/contents/models/index';
import {Imagee} from './models/image';

@Component({
  selector: 'ngx-tiny-mce-page',
  templateUrl: 'tiny-mce.component.html',
  providers: [ QuestionService],
})
export class TinyMCEComponent implements OnInit {

  constructor( private questionService: QuestionService) {}
  // tslint: disable;
  private opt1 = new OptionPost();
  private opt2 = new OptionPost();
  private opt3 = new OptionPost();
  private opt4 = new OptionPost();
  private question = new QuestionPost();
  //  quiz: Question = new Question(null);
  question_name: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  sub: number;
  class1: number;
  book: number;
  topic: number;
  subTopic: number;
  chp: number;
  type = new QuestionType();
  imagee = new Imagee();
  i: number;
  x: boolean;
   pager = {
    index: 0,
    size: 1,
    count: 1,
  };
  optionsList: OptionPost[] = new Array();
  getClass: Class[] = new Array();
    getSubject: BookSubject[] = new Array();
    getBook: Book[] = new Array();
    getChapter: Chapter[] = new Array();
    getTopic: Topic[] = new Array();
    getSubTopic: SubTopic[] = new Array();
    selectedSubject: BookSubject;
    selectedBook: Book;
    selectedChapter: Chapter;
    selectedTopic: Topic;
    selectedSubTopic: SubTopic;
    mode = 'selectQuest';
  ngOnInit() {
    // this.quizes = this.quizService.getAll();
    this.questionService.getContents().subscribe(data => {
      this.getClass.push(data);
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
url;
obj = new Array();
QuestionList:  Question[] = new Array();
refresh(): void {
    window.location.reload();
    this.mode = 'add';
}
getQuestions() {
    // console.log(this.selectedBook.id);
    // console.log(this.selectedSubject.id);
    // console.log(this.selectedChapter.id);
    // console.log(this.selectedTopic.id);
    // console.log(this.selectedSubTopic.id);
    this.url = 'http://127.0.0.1:8000/learning/questions_list/' + +localStorage.getItem('school') +
    '/' + +localStorage.getItem('class') + '/' + +localStorage.getItem('std') + '/' +
    this.selectedSubject.id + '/' + this.selectedBook.id + '/' + this.selectedChapter.id + '/'
    + this.selectedTopic.id + '/' + this.selectedSubTopic.id + '/';
    console.log(this.url);
    this.questionService.getQuestions(this.url).subscribe(data => {
      this.QuestionList = data;
      console.log(this.QuestionList[0]);
    //  this.obj.forEach(element => {
    //     // this.QuestionList.push(element);
    //     console.log(element);
    //   });
      // this.quiz = new Question(data);
      // console.log('ldifjsljfd', this.QuestionList);
      // this.pager.count = this.quiz.questions.length;
    });

    this.mode = 'result';

    //  this.view = 'quiz';
    //   this.date =  new Date();
    //   console.log('start', this.date);
}
  // abc: any;
 filename: string;
  fileChange(event) {
     const files = event.target.files;
      const file = files[0];

    if (files && file) {
        const reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
        this.filename = file.name;
    }
  }

base64textString;

  _handleReaderLoaded(readerEvt) {
     const binaryString = readerEvt.target.result;
            this.base64textString = btoa(binaryString);
            console.log(btoa(binaryString));
  }

  // form_data() {
  //   const formData: FormData = new FormData();
  //       formData.append('uploadFile', this.filename, this.filename.name);
  //       formData.append('question_image', new Blob([JSON.stringify(this.filename)], {type: 'application/json'}));
  //       console.log('image', formData);
  //       return formData;

  // }
  add(chp, subject, book, topic, subTopic, class1, diff, ans) {
    this.i = 1;
    const int_ans = +ans;
    for (this.i = 1; this.i < 5; this.i++) {
      // console.log('ans', ans);
      // console.log(this.i);
      if (this.i === int_ans) {
         this.x = true;
        //  console.log('if', this.x);
      }else {
        this.x = false;
        // console.log('else', this.x);
      }
      const opt = {
       id: this.i,
    option_text: tinymce.get(this.i * 10).getContent(),
    option_image: null,
    isAnswer: this.x,
    question: 3,
  };
  console.log(opt);
  this.optionsList.push(opt);
    }
    console.log(this.optionsList);
  // str: String;
  this.type.id = 1;
  this.type.q_type = 'Multiple Choice';
  this.type.isActive = true;

  this.imagee.name = this.filename;
  this.imagee.content_type = 'image/jpg';
  this.imagee.image_file = this.base64textString;
  console.log(this.imagee);

  this.question.question = tinymce.get('question').getContent();
  this.question.options = this.optionsList;
  this.option2 = tinymce.get('20').getContent();
  this.option3 = tinymce.get('30').getContent();
  this.option4 = tinymce.get('40').getContent();
  this.question.question_subject = this.selectedSubject.id;
  this.question.question_chapter = this.selectedChapter.id;
  this.question.question_class = +localStorage.getItem('class');
  this.question.question_book = this.selectedBook.id;
  this.question.question_topic = this.selectedTopic.id;
  this.question.question_subtopic = this.selectedSubTopic.id;
  // this.question.question_type.id = 1;
  // this.question.question_type.q_type = 'Multiple Choice';
  // this.question.question_type.isActive = true;
  console.log('add', this.filename);
  this.question.question_type = this.type;
  this.question.question_image = this.imagee;
  this.question.difficulty = diff;

  console.log('hkjhkjhk-------------------', this.question);
  this.questionService.start(this.question)
   .subscribe(
  error => alert(error),
() => console.log('successful'));
this.mode = 'result';
}




ans: any;
diff: any;
j;
id;


edit(question1: Question) {
  // tinymce.remove();
  //  tinymce.init({selector: '40'});
  this.mode = 'add';
  this.j = 1;
  console.log(question1.id);
  this.id = question1.id;
  // tinymce.init();
  // tinymce.init(question);
  setTimeout(() => {
    tinymce.get('question').setContent(question1.question);
question1.options.forEach(element => {
        // tinymce.get(this.j * 10).setContent(' ');
        // console.log(this.j * 10);
        tinymce.get(this.j * 10).setContent(element.option_text);
        // console.log(element);
        if (element.isAnswer === true) {
          this.ans = this.j;
        }
        this.j = this.j + 1;
      });

this.diff = question1.difficulty;
  }, 200);
}
addQuestion() {
 this.mode = 'add';
}


update(chp, subject, book, topic, subTopic, class1, diff, ans) {
    this.i = 1;
    const int_ans = +ans;
    for (this.i = 1; this.i < 5; this.i++) {
      // console.log('ans', ans);
      // console.log(this.i);
      if (this.i === int_ans) {
         this.x = true;
        //  console.log('if', this.x);
      }else {
        this.x = false;
        // console.log('else', this.x);
      }
      const opt = {
       id: this.i,
    option_text: tinymce.get(this.i * 10).getContent(),
    option_image: null,
    isAnswer: this.x,
    question: this.id,
  };
  console.log(opt);
  this.optionsList.push(opt);
    }
    console.log(this.optionsList);
  // str: String;
  this.type.id = 1;
  this.type.q_type = 'Multiple Choice';
  this.type.isActive = true;
  this.question.id = this.id;

  this.question.question = tinymce.get('question').getContent();
  this.question.options = this.optionsList;
  this.option2 = tinymce.get('20').getContent();
  this.option3 = tinymce.get('30').getContent();
  this.option4 = tinymce.get('40').getContent();
  this.question.question_subject = this.selectedSubject.id;
  this.question.question_chapter = this.selectedChapter.id;
  this.question.question_class = +localStorage.getItem('class');
  this.question.question_book = this.selectedBook.id;
  this.question.question_topic = this.selectedTopic.id;
  this.question.question_subtopic = this.selectedSubTopic.id;
  // this.question.question_type.id = 1;
  // this.question.question_type.q_type = 'Multiple Choice';
  // this.question.question_type.isActive = true;
  this.question.question_type = this.type;
  this.question.question_image = null;
  this.question.difficulty = diff;

  console.log('quest-----------', this.question);
  this.questionService.putQuestion(this.question)
   .subscribe(
  error => alert(error),
() => console.log('successful'));
this.mode = 'result';
}

}
