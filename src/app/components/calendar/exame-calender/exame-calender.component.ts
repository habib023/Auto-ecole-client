import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {addHours} from 'date-fns';
import {ExamService} from '../../../service/exam.service';
import * as jwt_decode from 'jwt-decode';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarService} from '../../../service/car.service';
import {MoniteursService} from '../../../service/moniteur.service';
import {ExamModel} from '../../../model/exam.model';
import {CarModel} from '../../../model/car.model';
import {MoniteurModel} from '../../../model/moniteur.model';
import {Observable} from 'rxjs';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'exame-calender',
  templateUrl: './exame-calender.component.html',
  styleUrls: ['./exame-calender.component.scss']
})
export class ExameCalenderComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  examEvent: CalendarEvent[] = [];
  exams: any[] = [];

  payload;
  modalData: {
    exams$: Observable<ExamModel>,
    cars$: Observable<CarModel[]>,
    monitors$: Observable<MoniteurModel[]>
  };

  constructor(
    private exameservice: ExamService,
    private modal: NgbModal,
    private carService: CarService,
    private monitorService: MoniteursService
  ) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.payload = jwt_decode(token);

    this.exameservice.getAllexam().subscribe((data) => {
      this.exams = data.filter(c => c.state !== 'succeed' &&
        c.state !== 'failed');
      this.processRequest(this.exams);
    });
  }


  processRequest(data: any[]) {
    console.log('Processing the data to be published in the calendar');
    this.examEvent = [];
    data.forEach((exam) => {
      if (['scheduled'].indexOf(exam.state) > -1) {
        this.examEvent.push({
          id: exam._id,
          title: ' Client:' + exam.client.name + ' ' + exam.client.surname +
            '   Moniteur:' + exam.monitor.name + ' ' + exam.monitor.surname +
            ' Voiture:' + exam.car.mark + ' ' + exam.car.model,
          color: (exam.client) ? colors.blue : colors.red,
          start: addHours(exam.examDate, 0),
          end: addHours(exam.examDate, 1),

        });
      }
    });
    console.log('ExameEvent: ', this.examEvent);
    console.log(' list: ', this.exams);
  }

}
