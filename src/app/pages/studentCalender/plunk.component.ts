import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import {Events} from './models/events';
import {EventLink} from './models/eventLink';
import {EventService} from './service/events.service';
import { SelectiveQuizService } from './service/quiz.service';
import { HelperService } from '../tables/contents/services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../tables/contents/models/index';
import { Answer} from '../selective/models/answer';
import { QuestAnswered} from '../selective/models/quest_answered';



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  // moduleId: __moduleName,
  selector: 'ngx-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['plunk.styles.css'],
  templateUrl: 'plunk.template.html',
  providers: [ EventService, SelectiveQuizService],
})
export class DemoComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';
  mode1: string = 'calendar' ;
  private event = new Events();
  viewDate: Date = new Date();
  events: CalendarEvent[] =  new Array();
eventlink: EventLink[] =  new Array();

  modalData: {
    action: string;
  };
  todayDate: Date;
getDate() {
  console.log('date', this.todayDate = new Date());
  return this.todayDate = new Date();
}
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        if (event.start <= this.getDate())
        this.startTest(event.title);
        else
        // this.modalData.action = 'Test is going to start on ' + event.start;
        this.handleEvent('Test is going to start on ' + event.start, event);
      },
    }
    ,
    // {
    //   label: '<i class="fa fa-fw fa-times"></i>',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter(iEvent => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   },
    // },
  ];

  refresh: Subject<any> = new Subject();
  // [
  //   // {
  //   //   start: subDays(startOfDay(new Date()), 1),
  //   //   end: addDays(new Date(), 1),
  //   //   title: 'A 3 day event',
  //   //   color: colors.red,
  //   //   actions: this.actions,
  //   // },
  //   // {
  //   //   start: startOfDay(new Date()),
  //   //   title: 'An event with no end date',
  //   //   color: colors.yellow,
  //   //   actions: this.actions,
  //   // },
  //      {
  //        start : startOfDay(new Date('2018-02-08T00:00:00+05:30')),
  //       title: 'Test12',
  //       color: colors.red,
  //       actions: this.actions,
  //      },
  //   // {
  //   //   start: subDays(endOfMonth(new Date()), 3),
  //   //   end: addDays(endOfMonth(new Date()), 3),
  //   //   title: 'A long event that spans 2 months',
  //   //   color: colors.blue,
  //   // },
  //   // {
  //   //   start: addHours(startOfDay(new Date()), 2),
  //   //   end: new Date(),
  //   //   title: 'A draggable and resizable event',
  //   //   color: colors.yellow,
  //   //   actions: this.actions,
  //   //   resizable: {
  //   //     beforeStart: true,
  //   //     afterEnd: true,
  //   //   },
  //   //   draggable: true,
  //   // },
  // ];

  activeDayIsOpen: boolean = true;

  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode: String = 'quiz';
  // view = 'selected';
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

  constructor(private modal: NgbModal, private eventService: EventService, private quizService: SelectiveQuizService) {}

ngOnInit() {
  this.eventService.getEvents().subscribe(data => {data.forEach(element => {
      const eve = {
        start : startOfDay(new Date(element.event_date_time)),
        title: element.event_name,
        color: colors.red,
        actions: this.actions,
        // link: element.event_link,
      };
      // console.log(eve);
      const link = {
        title : element.event_name,
        link : element.event_link,
      };
  this.events.push(eve);
  this.eventlink.push(link);
  console.log('link', this.eventlink);
    });
    });
}
url;
// startTest(event: string) {
//   //  url = '';
//    console.log('event', event);
//    this.eventlink.forEach(element => {
//      if (element.title === event) {
//      this.url = element.link;
//     }
// });

// this.start(this.url);
// }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: ' ',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    });
    console.log(this.events);
    this.refresh.next();
  }
  add(l): void {
    this.refresh.next();
    console.log(this.events[l].start);
    // const teacher_id = localStorage.getItem('id');
    // const school_id = localStorage.getItem('school');
    // const class_id = localStorage.getItem('class');
    // const std_id = localStorage.getItem('std');
    this.event.event_name = this.events[l].title;
    this.event.event_date_time = this.events[l].start;
    this.event.event_link = 'test';
    this.event.event_class = +localStorage.getItem('class');
    this.event.event_school = +localStorage.getItem('school');
    this.event.event_standard = +localStorage.getItem('std');
    this.event.teacher_id = +localStorage.getItem('id');
    this.eventService.start(this.event)
   .subscribe(
  error => alert(error),
() => console.log('successful'));

    }


startTest(event: string) {
  //  url = '';
   console.log('event', event);
   this.eventlink.forEach(element => {
     if (element.title === event) {
     this.url = element.link;
    }
});
    // console.log(this.selectedBook.id);
    // console.log(this.selectedSubject.id);
    // console.log(this.selectedChapter.id);
    // console.log(this.selectedTopic.id);
    // console.log(this.selectedSubTopic.id);
    // this.url = 'http://127.0.0.1:8000/learning/random_test_dynamic/' + +localStorage.getItem('school') +
    // '/' + +localStorage.getItem('class') + '/' + +localStorage.getItem('std') + '/' +
    // this.selectedSubject.id + '/' + this.selectedBook.id + '/' + this.selectedChapter.id + '/'
    // + this.selectedTopic.id + '/' + this.selectedSubTopic.id + '/5/';
    console.log(this.url);
    this.quizService.getQuest(this.url).subscribe(data => {this.quiz = new Quiz(data);
      this.pager.count = this.quiz.questions.length;
    });
//  this.mode = 'quiz';
    this.mode1 = 'quizBegins';
     setTimeout(() => {
     this.mode = 'quiz';
    }, 50);
    this.mode = 'quiz';
    // console.log('mode1', this.mode1);
      // console.log('quiz', this.quiz);
    //   this.startDate = new Date();
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

