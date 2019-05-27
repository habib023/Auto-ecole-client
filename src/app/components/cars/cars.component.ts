import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CarService} from '../../service/car.service';
import {CarModel} from '../../model/car.model';

import {Admin} from '../../model/admin.model';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {MatTable} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DisplayNotificationService} from '../../service/display-notification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BreakdownService} from '../../service/breakdown.service';
import {breakdownModel} from '../../model/breakdown.model';


declare var M: any;

@Component({
  selector: 'app-car',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  providers: [CarService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CarsComponent implements OnInit {


  @ViewChild('carTab') carTable: MatTable<CarTable>;
  @ViewChild('breakdownTab') breakdownTable: MatTable<BreakdownTable>;

  carsArray: CarModel[];
  users: Admin[] = [];
  allCarTableColumns = ['num', 'mark', ' model', 'dateFirstRegistration', 'state', 'action'];

  carDataSource: CarTable[] = [];
  addForm: FormGroup;
  carColumns = this.allCarTableColumns.slice(0, 5);
  CarColumnsNameInFr = {
    'num': 'numéro plate',
    'mark': 'marque',
    'model': 'modèle',
    'dateFirstRegistration': 'date première mise en circulation',
    'state': 'status',
  };
  submitted = false;
  dataSourceBreakdown: BreakdownTable[] = [];
  expandedElement: CarTable | any;
  allBreakdownTableColumns = ['car', 'monitor', 'iscritical', 'state', 'action'];
  BreakdownColumns = this.allBreakdownTableColumns.slice(0, 4);
  BreakdownColumnsNameInFr = {
    'car': 'voiture',
    'monitor': 'moniteur',
    'iscritical': 'critique',
    'raisonbreakdown': 'raison',
    'state': 'status',
  };
  expandedElementBreakdown: BreakdownTable | any;
  private tmp: CarModel = null;
  private breakdowns: breakdownModel[];

  private modalRef: any;

  constructor(private carService: CarService ,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private displayNotif: DisplayNotificationService,
              private modalService: NgbModal,
              private breakdownService: BreakdownService,
              private router: Router) {
   }

  ngOnInit() {
    this.getAllCars();
    this.getAllBreakdown();

  }

  getAllBreakdown(): void {
    this.breakdownService.getAllbreakdow().subscribe(data => {
      this.breakdowns = data;
      data.forEach((c) => {
        this.dataSourceBreakdown.push({
          car: c.car.num,
          monitor: c.monitor.name + ' ' + c.monitor.surname,
          iscritical: c.iscritical,
          raisonbreakdown: c.raisonbreakdown.toString(),
          state: c.state.toString(),
        });
        console.log(this.dataSourceBreakdown);
        this.breakdownTable.renderRows();
      });
    });
  }

  getAllCars(): void {
    this.carService.getAllCars().subscribe(data => {
      this.carsArray = data;
      console.log(data);
      this.carDataSource = [];
      data.forEach(c => {
        this.carDataSource.push({
          num: c.num,
          mark: c.mark,
          model: c.model,
          dateFirstRegistration: new DatePipe('en-US').transform(c.dateFirstRegistration, 'EEEE dd MMMM yyyy'),
          state: c.state,
        });
      });
      this.carTable.renderRows();
    });
  }

  deleteCar(num: CarModel) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement?') === true) {
      const id = this.getCarWithNum(num)._id;
      this.carService.deleteCar(id).subscribe(data => {
        this.getAllCars();
        this.displayNotif.pushNotif('Opération réussie',
          'La supprimer du voiture est effectue avec succès',
          4, 0);
      });
    }
  }

  openAddCarModal(addCar): void {
    this.tmp = null;
    this.modalRef = this.modalService.open(addCar, {
      size: 'lg',
      windowClass: 'car-add-modal',
    });
  }

  openCarUpdateModal(addCar, num) {
    this.modalRef = this.modalService
      .open(addCar, {
        size: 'lg',
        windowClass: 'car-add-modal',
      });
    this.tmp = this.getCarWithNum(num);
  }

  getCarWithNum(num) {
    return this.carsArray.filter(c => c.num === num)[0];
  }

  closeCarModal(event) {
    this.modalRef.close();
    this.getAllCars();
  }

  openResolveBreakdownModal(content: any, row: any) {

  }
}


export interface CarTable {
  num: string;
  mark: string;
  model: string;
  dateFirstRegistration: string;
  state: string;
}

export interface BreakdownTable {
  car: string;
  monitor: string;
  iscritical: Boolean;
  raisonbreakdown: string;
  state: string;
}
