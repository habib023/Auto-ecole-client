import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExameCalenderComponent} from './exame-calender.component';

describe('ExameCalenderComponent', () => {
  let component: ExameCalenderComponent;
  let fixture: ComponentFixture<ExameCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExameCalenderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
