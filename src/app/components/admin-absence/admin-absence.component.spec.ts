import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAbsenceComponent} from './admin-absence.component';

describe('AdminAbsenceComponent', () => {
  let component: AdminAbsenceComponent;
  let fixture: ComponentFixture<AdminAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAbsenceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
