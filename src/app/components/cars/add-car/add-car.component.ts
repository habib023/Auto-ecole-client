import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../../service/car.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {CarModel} from '../../../model/car.model';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  @Input() public car: CarModel | any;
  @Output() submit = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private carService: CarService) {
  }

  addForm: FormGroup;
  submitted = false;

  ngOnInit() {
    console.log('init add car');
    const token = localStorage.getItem('token');
    const payload = jwt_decode(token);
    const agenceId = payload.agency;
    this.addForm = this.formBuilder.group({
      model: ['', Validators.required],
      num: ['', Validators.required],
      mark: ['', Validators.required],
      agency: agenceId,
      serialNum: ['', Validators.required],
      dateFirstRegistration: ['', Validators.required],
      exploitationCartDate: ['', Validators.required],
      exploitationCartNum: ['', Validators.required],
    });
    if (this.car !== null) {
      this.car.dateFirstRegistration = new Date(this.car.dateFirstRegistration).toISOString().substring(0, 10);
      this.car.exploitationCartDate = new Date(this.car.exploitationCartDate).toISOString().substring(0, 10);
      this.addForm.patchValue(this.car);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      if (this.car === null) {
        this.carService.addCar(this.addForm.value).subscribe((car) => {
          this.submit.emit({op: 'add'});
        });
      } else {
        this.carService.updateCar(this.addForm.value, this.car._id).subscribe((car) => {
          this.submit.emit({op: 'updated'});
        });
      }
    }
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
