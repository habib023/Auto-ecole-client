import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {colors} from '../calendar-header/colors';
import {addHours, isSameDay, isSameMonth} from 'date-fns';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls:['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input('events-list')  events: CalendarEvent[];
  view = 'month';

  viewDate: Date = new Date();

  // events list
  events2: CalendarEvent[] = [
    {
      title: 'Editable event',
      color: colors.yellow,
      start: new Date( addHours(Date.now(), 24)),
      end: new Date( addHours(Date.now(), 1)),
      actions: [
        {
          label: '<i class="fa fa-fw fa-pencil"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            console.log('Edit event', event);
          }
        }
      ]
    },
    {
      title: 'Deletable event',
      color: colors.blue,
      start: new Date(),
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            console.log('Event deleted', event);
          }
        }
      ]
    }, {
      title: 'C: ahmed benyahia M: salim kanosi V: r51954',
      color: colors.yellow,
      start: new Date(),
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            console.log('Event deleted', event);
          }
        }
      ]
    },
    {
      title: 'Non editable and deletable event',
      color: colors.red,
      start: new Date()
    }
  ];

  private activeDayIsOpen = false;

  // when a day is clicked show the events in that day
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true)
        || events.length === 0);
    }
  }

  ngOnInit() {
    // console.log(this.events);
  }
}
