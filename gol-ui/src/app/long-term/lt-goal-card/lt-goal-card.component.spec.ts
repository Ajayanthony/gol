import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtGoalCardComponent } from './lt-goal-card.component';

describe('LtGoalCardComponent', () => {
  let component: LtGoalCardComponent;
  let fixture: ComponentFixture<LtGoalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtGoalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtGoalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
