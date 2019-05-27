import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExamService} from '../../service/exam.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {

  exam: any;
  editForm: FormGroup;
  submitted = false;
  examId;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private examService: ExamService,
              private activeRoute: ActivatedRoute,
  ) {
  }

  get f() {
    return this.editForm.controls;
  }

  ngOnInit() {

    this.activeRoute.params.subscribe((data) => {
      if (!data) {
        console.log('Something wrong!');
        this.router.navigate(['']);
        return;
      }
      this.examId = data['id'];
    });
    if (!this.examId) {
      alert('Something wrong!');
      this.router.navigate(['']);
      return;


    }

    this.editForm = this.formBuilder.group({
      examinateur: ['', Validators.required],

    });
    this.examService.getexam(this.examId).subscribe((data) => {
      this.exam = data;
      this.editForm.patchValue(data); // Don't use editForm.setValue() as it will throw console error
    }, (err => console.log(err.message)));


  }

  onSubmit(buttonType: string): void {
    this.submitted = true;
    if (this.editForm.valid) {
      if (buttonType === 'Next') {
        console.log(this.editForm.value);
        this.exam.examinateur = this.editForm.value.examinateur;
        this.examService.sucsessexam(this.exam)
          .subscribe(data => {
            console.log('the result of the put request to car contoller is : ', data);
            this.router.navigate(['admin/exam']);
          });
      }

      if (buttonType === 'Previous') {
        this.exam.examinateur = this.editForm.value.examinateur;
        console.log(this.editForm.value);
        this.examService.faildexam(this.exam)
          .subscribe(data => {
            console.log('the result of the put request to car contoller is : ', data);
            this.router.navigate(['admin/exam']);
          });
      }
    }
  }

}
