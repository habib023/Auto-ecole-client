import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveClientUpdateComponent } from './passive-client-update.component';

describe('PassiveClientUpdateComponent', () => {
  let component: PassiveClientUpdateComponent;
  let fixture: ComponentFixture<PassiveClientUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassiveClientUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveClientUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
