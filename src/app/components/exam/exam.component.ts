import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client.model';
import {CarModel} from '../../model/car.model';
import {ExamModel} from '../../model/exam.model';
import {MoniteurModel} from '../../model/moniteur.model';
import {MoniteursService} from '../../service/moniteur.service';
import {CarService} from '../../service/car.service';
import {ExamService} from '../../service/exam.service';
import {ClientService} from '../../service/client.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {


  searchText;


  closeResult: string;

  exam: any;
  moniteurs: MoniteurModel[] = [];
  clients: Client[] = [];
  cars: CarModel[] = [];
  exames: ExamModel[] = [];
  users: Client[] = [];
  addForm: FormGroup;


  constructor(private modalService: NgbModal,
              private moniteursService: MoniteursService,
              private carService: CarService,
              private examService: ExamService,
              private userService: ClientService,
              private formBuilder: FormBuilder,
              private router: Router,
  ) {
  }

  get f() {
    return this.addForm.controls;
  }
  ngOnInit() {
    this.loadAllUsers();
    this.getAllMoniteurs();
    this.getAllCars();
    this.getallexames();

    const token = localStorage.getItem('token');
    const payload = jwt_decode(token);
    this.addForm = this.formBuilder.group({
      client: ['', Validators.required],
      moniteur: ['', Validators.required],
      car: ['', Validators.required],
      examDate: ['', Validators.required],
      numexam: ['', Validators.required],
      agency: payload.agency,
    });

  }

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  getAllCars(): void {
    this.carService.getAllCars().subscribe(data => {
      this.cars = data;
      this.cars = this.cars.filter(item => item.state === 'Active'); // todo

    });
  }

  getAllMoniteurs(): void {
    this.moniteursService.getAllMoniteurs().subscribe(data => {

      this.moniteurs = data;
    });
  }

  getallexames(): void {
    this.examService.getAllexam().subscribe(data => {
      this.exames = data;
    });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
    });
  }

  onSubmit(numexam, examDate, user, car, moniteur) {
    const exam = new ExamModel;
    exam.car = this.cars[car];
    console.log('car index' + car);
    exam.moniteur = this.moniteurs[moniteur];
    exam.client = this.users[user];
    console.log('user index' + user);
    exam.examDate = this.addForm.value.examDate;
    exam.numexam = this.addForm.value.numexam;
    console.log('monitor index' + moniteur);


    this.examService.addexam(exam).subscribe(exam => {
      this.getallexames();
      console.log(exam);
    });

  }

  resultatexam(exam: ExamModel) {
    console.log('updating exam with id:', exam._id);
    if (exam.state === 'scheduled') {
      this.router.navigate(['admin/exam-result', exam._id]);
    } else {
      console.log('Reset Exam state firs');
    }
  }


  rest(exam: ExamModel) {
    if (confirm('Are you sure to rest this record ?') === true) {
      this.examService.resetexam(exam).subscribe(data => {
        console.log(data);
        this.getallexames();

      });
    }
  }
}
