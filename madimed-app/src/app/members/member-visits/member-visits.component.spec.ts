import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberVisitsComponent } from './member-visits.component';

describe('MemberVisitsComponent', () => {
  let component: MemberVisitsComponent;
  let fixture: ComponentFixture<MemberVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
