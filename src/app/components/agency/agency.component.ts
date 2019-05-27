import {Component, OnInit} from '@angular/core';
import {AgenceService} from '../../service/agence.service';
import {Agence} from '../../model/agence.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {

  agences: Agence[];
  agence: Agence;
  closeResult: string;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  currentAgenc = Agence;
  regions = ['ariana', 'tunis', 'ben arous']


  constructor(private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private agenceService: AgenceService, private formBuilder: FormBuilder, private router: Router) { }


    get f() {
      return this.registerForm.controls;
    }
    
  ngOnInit() {


    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      cin: ['', Validators.required],
      cinDate: ['', Validators.required],
     
      phone: ['', Validators.required],
      taxRegistrationDate: ['', Validators.required],
      taxRegistrationNum: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      postalCode:['', Validators.required],
      region: ['', Validators.required],
    });
    this.getAllAgence('item.region');
  }

  getAllAgence(region: string): void {
    this.agenceService.getAllAgence().subscribe(data => {
      this.agences = data;
      this.agences = this.agences.filter(item => item.region === region);
      console.log(this.agences);
    });
  }
  

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.registerForm.value);
    this.agenceService.addagence(this.registerForm.value)
      .subscribe(
        (data) => {
          
          this.getAllAgence('r');
        },
        (error) => {
          
          console.log('er' + error);
        });

  }
  
}
