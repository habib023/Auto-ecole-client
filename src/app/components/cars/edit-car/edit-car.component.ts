import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../../service/car.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CarModel} from '../../../model/car.model';


@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  car: CarModel;
  editForm: FormGroup;
  submitted = false;
  carId;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private carService: CarService,
              private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((data) => {
      if (!data) {
        console.log('Something wrong!');
        this.router.navigate(['']);
        return;
      }
       this.carId = data['id'];
    });
    if (!this.carId) {
      alert('Something wrong!');
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      model: ['', Validators.required],
      num: ['', Validators.required],
      mark: ['', Validators.required],
      serialNum: ['', Validators.required],
      dateFirstRegistration: ['', Validators.required],
      exploitationCartDate: ['', Validators.required],
      exploitationCartNum: ['', Validators.required],
    });
    console.log('getting car info with this id:', this.carId);
    this.carService.getCarById(this.carId).subscribe((data) => {
      this.car = data;
      this.editForm.patchValue(data); // Don't use editForm.setValue() as it will throw console error
    }, (err => console.log(err.message)));
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.carService.updateCar(this.editForm.value, this.carId)
      .subscribe( data => {
        console.log('the result of the put request to car contoller is : ', data);
        this.router.navigate(['admin/cars']);
      });
    }
  }

}
