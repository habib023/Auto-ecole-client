import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../service/car.service';
import {BreakdownService} from '../../service/breakdown.service';
import {breakdownModel} from '../../model/breakdown.model';
import * as jwt_decode from 'jwt-decode';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarModel} from '../../model/car.model';

@Component({
  selector: 'breakdown',
  templateUrl: './breakdown.component.html',
  styleUrls: ['./breakdown.component.scss']
})
export class BreakdownComponent implements OnInit {

  cars: CarModel[];
  Breakdowns: breakdownModel[];
  loading = false;
  submitted = false;
  currentUser: string;
  addForm: FormGroup;
  agency: string;


  constructor(
    private carService: CarService,
    private breakdownService: BreakdownService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
    const token = localStorage.getItem('token');
    const payload = jwt_decode(token);
    this.currentUser = payload._id;
    this.agency = payload.agency;

  }

  get f() {
    return this.addForm.controls;
  }

  ngOnInit() {
    this.getAllbreakdwon();
    this.getAllCars();

    this.addForm = this.formBuilder.group({
      raisonbreakdown: ['', Validators.required],
      car: ['', Validators.required],
      monitorId: this.currentUser,
      agency: jwt_decode(localStorage.getItem('token')).agency,
    });

  }

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  getAllbreakdwon(): void {
    this.breakdownService.getAllbreakdow().subscribe(data => {
      this.Breakdowns = data;
    });
  }


  getAllCars(): void {
    this.carService.getAllCars().subscribe(data => {
      this.cars = data;
    });
  }


  onSubmit(raisonbreakdown, car,) {
    const breakdown = new breakdownModel;
    breakdown.raisonbreakdown = this.addForm.value.raisonbreakdown;
    breakdown.carId = this.cars[car]._id;
    breakdown.monitorId = this.addForm.value.monitorId;
    breakdown.agency = this.addForm.value.agency;
    this.submitted = true;
    // stop here if form is invalid
    this.loading = true;
    console.log(this.addForm.value);
    this.breakdownService.addbreakdow(breakdown)
      .subscribe(data => {
        console.log('xdcgfbhjk,l' + data);
        this.Breakdowns.push(breakdown);

      }, (error) => {
        console.log('err' + error);
      });

  }

  deletebreakdown(breakdown: breakdownModel) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.breakdownService.cancelbreakdow(breakdown._id).subscribe(data => {
        console.log(data);
        this.getAllbreakdwon();
      });
    }


  }

  breakdowniscritical(breakdown: breakdownModel) {
    if (confirm('Are you sure  this record is critical ?') === true) {
      this.breakdownService.iscriticalbreakdow(breakdown._id).subscribe(data => {
        console.log(data);
        this.getAllbreakdwon();
      });

      //this.breakdownService.iscriticalbreakdow(breakdown._id);
    }

  }
}
