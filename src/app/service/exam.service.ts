import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExamModel} from '../model/exam.model';


@Injectable({
  providedIn: 'root'
})
export class ExamService {


  baseurl = 'http://localhost:3000/';
  selectedexam: ExamModel;

  constructor(private http: HttpClient) {
  }

  getexam(id: string) {
    return this.http.get<[ExamModel]>(this.baseurl + 'exam/' + id);

  }


  getAllexam() {
    return this.http.get<[ExamModel]>(this.baseurl + 'exam');
  }


  addexam(exam: ExamModel) {

    return this.http.post(this.baseurl + 'exam/scheduled', {
      examDate: exam.examDate,
      numexam: exam.numexam,
      carId: exam.car._id,
      monitorId: exam.moniteur._id,
      clientId: exam.client._id
    });
  }

  sucsessexam(exam: ExamModel) {
    console.log(exam._id);
    return this.http.patch(this.baseurl + 'exam/succeed/' + exam._id, {
      examinateur: exam.examinateur,
    });
  }

  faildexam(exam: ExamModel) {
    console.log(exam);
    console.log(exam._id);

    return this.http.patch(this.baseurl + 'exam/failed/' + exam._id, {
      examinateur: exam.examinateur,
    });
  }

  resetexam(exam: ExamModel) {
    return this.http.patch(this.baseurl + 'exam/reset/' + exam._id, {});
  }

  updateexam(exam: ExamModel) {
    return this.http.put(this.baseurl + 'exam/update/' + exam._id, {
      examDate: exam.examDate,
      numexam: exam.numexam,
      carId: exam.car._id,
      monitorId: exam.moniteur._id,
      clientId: exam.client._id
    });
  }
}
