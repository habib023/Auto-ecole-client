import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AbsenceMonitorComponent} from './absence-monitor.component';

describe('AbsenceMonitorComponent', () => {
  let component: AbsenceMonitorComponent;
  let fixture: ComponentFixture<AbsenceMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceMonitorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
