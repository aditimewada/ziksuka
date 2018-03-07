import { Component, OnInit } from '@angular/core';

import { SelectiveQuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { Answer} from '../models/answer';
import { QuestAnswered} from '../models/quest_answered';

@Component({
  selector: 'ngx-register',
  templateUrl: './selectiveQuiz.component.html',
  styleUrls: ['./selectiveQuiz.component.css'],
  providers: [SelectiveQuizService],
})
export class RegisterQuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
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
  answerResp = new Answer();
  quest_ans: QuestAnswered[] = new Array();
  date;
  startDate;

  constructor(private quizService: SelectiveQuizService) { }

  ngOnInit() {
    // this.quizes = this.quizService.getAll();
    this.quizService.getQuest().subscribe(data => {this.quiz = new Quiz(data);
      this.pager.count = this.quiz.questions.length;
    });
    this.startDate = new Date();
    // console.log('JSON',JSON.stringify(this.quizService.getQuest()));
    // this.quizName = this.quizes[0].id;
    // this.loadQuiz(this.quizName);
  }

  // loadQuiz(quizName: string) {
  //   this.quizService.get(quizName).subscribe(res => {
  //     this.quiz = new Quiz(res);
  //     this.pager.count = this.quiz.questions.length;
  //   });
  //   this.mode = 'quiz';
  // }

  get filteredQuestions() {
    const quest = (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
      // console.log(quest[0]);
      this.date =  new Date();
      // console.log('end', this.date);
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.option_text !== option.option_text) { x.selected = false; } });
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
  time(question: Question) {
console.log(question);

  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isCorrect(question: Question) {
    // question.options.forEach(x => console.log('isans', x.selected === x.isAnswer));
    return question.options.every(x => x.selected === x.isAnswer === true) ? 'correct' : 'wrong';
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
    this.answerResp.student_id = 3;
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
