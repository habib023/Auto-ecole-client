import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MonitorProfileComponent} from './monitor-profile.component';

describe('MonitorProfileComponent', () => {
  let component: MonitorProfileComponent;
  let fixture: ComponentFixture<MonitorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
