import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MoniteursService} from '../../../service/moniteur.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MoniteurModel} from '../../../model/moniteur.model';


@Component({
  selector: 'app-edit-moniteur',
  templateUrl: './edit-moniteur.component.html',
  styleUrls: ['./edit-moniteur.component.css']
})
export class EditMoniteurComponent implements OnInit {

  moniteur: MoniteurModel;
  editForm: FormGroup;
  submitted = false;
  moniteurId;
  constructor(private formBuilder: FormBuilder,
              private activeRouter: ActivatedRoute,
              private router: Router,
              private moniteursService: MoniteursService
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe((data) => {
      console.log(data);
      if (!data) {
        console.log('Something wrong!');
        this.router.navigate(['']);
        return;
      }
      this.moniteurId = data['id'];
    });
    if (!this.moniteurId) {
      alert('Something wrong!');
      this.router.navigate(['']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required],
      cin: ['', Validators.required],
      cinDate: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      postalCode: ['', Validators.required],
      drivingLicenceType: ['', Validators.required],
      drivingLicenceNum: ['', Validators.required],
      drivingLicenceDate: ['', Validators.required],
    });
    console.log('getting moniteuyrr', this.moniteurId);
    this.moniteursService.getMoniteurByIdAdmin(this.moniteurId).subscribe((data) => {
      console.log(data);
      this.moniteur = data;
      this.editForm.patchValue(data);
      // Don't use editForm.setValue() as it will throw console error
    });
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.moniteursService.updateMoniteurAdmin(this.editForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['admin/moniteurs']);
      });
    }
  }

}
