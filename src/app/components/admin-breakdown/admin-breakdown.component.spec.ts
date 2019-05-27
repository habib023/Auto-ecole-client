import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminBreakdownComponent} from './admin-breakdown.component';

describe('AdminBreakdownComponent', () => {
  let component: AdminBreakdownComponent;
  let fixture: ComponentFixture<AdminBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBreakdownComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
