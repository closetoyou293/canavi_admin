import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecruiterComponent } from './manage-recruiter.component';

describe('ManageRecruiterComponent', () => {
  let component: ManageRecruiterComponent;
  let fixture: ComponentFixture<ManageRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
