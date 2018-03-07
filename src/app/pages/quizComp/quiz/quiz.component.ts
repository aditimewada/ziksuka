import { Component, OnInit } from '@angular/core';

// import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
// import { Option, Question, Quiz, QuizConfig } from '../models/index';
import {  QuizConfig } from '../models/index';
import { User } from '../models/user';
import {UserService} from '../services/user.service';
import {Questions} from '../models/questions';
import {Choice} from '../models/choice';
import {Select} from '../models/select';
import {NextQuestion} from '../models/nextQuest';

@Component({
  selector: 'ngx-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [ UserService],
})
export class QuizComponent {
  quizes: any[];
  // quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': true,  // indicates if you must answer all the questions before submitting.
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
  private user = new User();
  private quest = new Questions();
  private next = new NextQuestion();
  private ch = new Choice(null);
  select = new Select(null);
  myvar: string[] = [];
  private ch1;
  view = 'quiz';
  constructor( private userService: UserService) { }

  onSelect(id, quest: Questions, ch: Choice, option: Select) {
   ch.choice.forEach((x) => { if (x !== option) x.selected = false; });
      console.log('OPtion', option);
      this.next.user_id = id;
      this.next.last_response = this.lastResp(id, quest, ch, option);
      this.next.last_qid = quest.id;
    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  quizStart() {
   this.user.user_id = +localStorage.getItem('id');
   this.user.last_response = -1;
   console.log('_______' + JSON.stringify(this.user));
   this.userService.start(this.user)
   .subscribe(data => this.quest = data,
  error => alert(error),
() => this.cool(),
 );
//  console.log("__END___",JSON.stringify(this.quest));
 this.view = 'quizStarted';

  }

  answer(quest: Questions, ch: Choice) {
    if (quest.answer === 'A') {
      return ch.choice[0];
    }else if (quest.answer === 'B') {
      return ch.choice[1];
    }else if (quest.answer === 'C') {
      console.log('iiii', ch.choice[2]);
      return ch.choice[2];
    }else {
      return ch.choice[3];
    }

  }


  lastResp(id, quest: Questions, ch: Choice, option: Select) {
    if (this.answer(quest, ch) === option) {
      return 1;
    }else {
      return 0;
    }
    // console.log("ans",this.answer(quest,ch));
  }

   nextQuestion(id, quest: Questions) {
    // this.next.last_qid = quest.id;
    if (this.next.last_response === undefined) {
      console.log('inside if', this.next);
      error => alert('Please select an option');
    }
        console.log('_____last', this.next.last_response);
        console.log('_______' + JSON.stringify(this.next));
        this.userService.start(this.next)
        .subscribe(data => this.quest = data,
       error => alert('ERR ERROR, TRY AFTER SOMETIME'),
     () => this.myvar = this.quest.choices.split('\r\n'),
      );
    // this.quest = {"question":"Test 7","id":7,"difficulty":2.674,
    // "choices":"sdagsvdjabsd\r\nasdaystdvakushda\r\nsdastdavksdtvasd\r\nasdaytsvdahgsda",
    // "ability":0.5635,"answer":"C"};
      console.log('__END___', JSON.stringify(this.quest));
      // window.location.reload();
   }

  cool() {
    this.myvar = this.quest.choices.split('\r\n');
    console.log('__END___', JSON.stringify(this.quest));
    this.ch = new Choice(this.myvar);
    console.log('Select', JSON.stringify(this.ch.choice));
    // console.log("__END___",JSON.stringify(this.quest));
  }
  }
