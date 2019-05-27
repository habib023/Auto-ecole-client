import {Component, OnInit} from '@angular/core';
import {CarService} from '../../service/car.service';
import {MoniteursService} from '../../service/moniteur.service';
import {MoniteurModel} from '../../model/moniteur.model';
import {CarModel} from '../../model/car.model';
import {Label, monkeyPatchChartJsLegend,MultiDataSet, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {SessionModel} from '../../model/session.model';
import {SessionsService} from '../../service/session.service';
import {ExamService} from '../../service/exam.service';
import {ExamModel} from '../../model/exam.model';
import * as chartJs from 'chart.js';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {




   

  exames :ExamModel[]=[]
  moniteurs:MoniteurModel[];
  cars: CarModel[];
  carslpit: any [];
  sessions: SessionModel[] = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

    // exame chart.js 

    public examama: string[] = [];
    
  public polarAreaChartLabels: Label[] =  []
  public polarAreaChartData: SingleDataSet = [];
   
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  

 

  public  nhbmoniteur : any [] ;
  public  nbhcar : any [];
// Doughnut /moniteur chart statistique
public doughnutChartLabels: string[] = []; // liste of moniteur name 
public doughnutChartData: SingleDataSet = [];
public doughnutChartType: ChartType = 'doughnut';
public DagColors = [
  {
    backgroundColor: ['rgba(0,0,0,0.1)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,255,0.3)','rgba(125,40,20,0.3)',],
  },
];
// chart for car
  public pieChartLabels: string []= [] ;
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,5,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,255,0.3)','rgba(125,40,20,0.3)',],
    },
  ];
  length: Number;
  sessioncar: any[];
  public chartColor;
  public canvas: any;
  sessionsTmp: SessionModel[];
  constructor(private carService: CarService,
    private examService: ExamService,
    private moniteursService: MoniteursService,
              private serviceSession: SessionsService,
  ) {
  }
  ngOnInit() {
    this.chartColor = '#FFFFFF';
    this.getAllCars();
    this.getAllMoniteurs();
    this.getallexames();

  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }
  getAllSession(): void {
    this.serviceSession.getAllSession().subscribe((data) => {
      this.sessions = data;
      this.sessions = this.sessions.filter(item => item.state === 'APPROVED'); // todo
      console.log(this.sessions);
    });
}
getAllCars(): void {
  this.getAllSession();
  const  nbhr: number[] = [] ;
  const  Afmodel: string[] = [] ;
  let x = 0;
  this.carService.getAllCars().subscribe(data => {
    this.cars = data;
    data.forEach((item) => {
      console.log("tableau de cars hours"+nbhr)
      x = 0;
     this.pieChartLabels.push(item.model.toString());  
      console.log(item);
      this.sessions.forEach((val) => {
        if (item.model === val.car.model) {
          x++;
        }
        console.log(x)
      });
      nbhr.push(x);
      
      
      this.pieChartData.push(x);
      console.log("apres push  de cars hours"+nbhr)
        Afmodel.push(item.model.toString());
  });
  });
}
//this.doughnutChartLabels.push(data[i].surname.toString());
getAllMoniteurs(): void {
  this.getAllSession();
   const  nbhr: number[] = [] ;
   const  Afmodel: string[] = [] ;
   let x = 0;
  this.moniteursService.getAllMoniteurs().subscribe(data => {
    this.moniteurs = data;
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].surname);
      this.doughnutChartLabels.push(data[i].surname.toString());
   }
   data.forEach((item) => {
    x = 0;
   //this.pieChartLabels.push(item.surname.toString());  // a refaire
    console.log(item);
    this.sessions.forEach((val) => {
      if (item.surname === val.monitor.surname) {
        x++;
      }
      console.log(x)
    });
    nbhr.push(x);
    this.doughnutChartData.push(x);
});
  });
}

 

cleanArray(array) {
  var i, j, len = array.length, out = [], obj = {};
  for (i = 0; i < len; i++) {
    obj[array[i]] = 0;
  }
  for (j in obj) {
    out.push(j);
  }
  return out;
}

getallexames(): void {
  const  nbhr: number[] = [] ;
   const  Afmodel: string[] = [] ;
   let x = 0;
   let y = 0;
   let z = 0;
  this.examService.getAllexam().subscribe(data => {
    this.exames = data;
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].state);
      this.examama.push(data[i].state.toString())
      console.log(data[i].state.toString())
    }
    
    this.polarAreaChartLabels = this.cleanArray(this.examama);


      x = 0;
     //this.pieChartLabels.push(item.surname.toString());  // a refaire
      this.exames.forEach((val) => {
        if (val.state ==='scheduled') {
          x++;
        }
        if (val.state ==='succeed') {
          y++;
        }
        if (val.state ==='failed') {
          z++;
        }
      });
      nbhr.push(x);
      this.polarAreaChartData.push(x)
      this.polarAreaChartData.push(y)
      this.polarAreaChartData.push(z)


  
   
  });
}


// events


}
