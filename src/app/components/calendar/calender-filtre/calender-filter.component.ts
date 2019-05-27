import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SessionsService} from '../../../service/session.service';
import {ClientService} from '../../../service/client.service';
import {MoniteursService} from '../../../service/moniteur.service';
import {CarService} from '../../../service/car.service';

@Component({
  selector: 'calender-filter',
  templateUrl: './calender-filter.component.html',
  styleUrls: ['./calender-filter.component.scss']
})
export class CalenderFilterComponent implements OnInit {

  @Output() checked: EventEmitter<any> = new EventEmitter(true) ;

   clients: any[]  = [];
   cars: any[]  = [];
   monitors: any[]  = [];

  selectedClients = new Set();
  selectedMonitors = new Set();
  selectedCars = new Set();
  selectedType = new Set();

  typeSession = [{id: 1, value: 'conduite'}, {id: 2, value: 'code'}, {id: 3, value: 'examen'}];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true,
    closeDropDownOnSelection: false,
  };

  mapCar = (x) => {
    return {id: x._id, value: x.mark + ' ' + x.serialNum};
  }
  mapClient = (x) => {
    return {id: x._id, value: x.name + ' ' + x.surname};
  }
  mapMonitor = (x) => {
    return {id: x._id, value: x.name + ' ' + x.surname};
  }
  emitChanges = () => this.checked.emit({
      'client' : Array.from(this.selectedClients),
      'monitor': Array.from(this.selectedMonitors),
      'car'    : Array.from(this.selectedCars),
      'type'   : Array.from(this.selectedType),
  })
  constructor(private sessionService: SessionsService,
              private clientService: ClientService,
              private monitorService: MoniteursService,
              private carService: CarService,
              ) {}

  ngOnInit() {
    this.clientService.getAll().subscribe((data) => {
      this.clients = data;
    });
    this.monitorService.getAllMoniteurs().subscribe((data) => {
      this.monitors = data;
    });
    this.carService.getAllCars().subscribe((data) => {
      this.cars = data;
    });
  }

  onItemSelect(item: any) {
    this.emitChanges();
  }

  onDeSelect(items: any) {
    this.emitChanges();
  }

  onSelectAll(items: any[]) {
    setTimeout(() =>     this.emitChanges(), 20);
  }

  onDeSelectAll(items: any[]) {
    setTimeout(() => this.emitChanges(), 20);
  }
}
