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
  providers: [ EventService],
})
export class DemoComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';
  private event = new Events();

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // console.log('link', event.link),
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
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

  constructor(private modal: NgbModal, private eventService: EventService) {}
events: CalendarEvent[] =  new Array();
eventlink: EventLink[] =  new Array();
ngOnInit() {
  this.eventService.getEvents().subscribe(data => {data.forEach(element => {
      const eve = {
        start : startOfDay(new Date(element.event_date_time)),
        title: element.event_name,
        color: colors.red,
        actions: this.actions,
        link: element.event_link,
      };
      // console.log(eve);
  this.events.push(eve);
    });
    });
}

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
    this.modalData = { event, action };
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


}

