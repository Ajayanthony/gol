import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGoalStatusUpdateComponent } from './dialog-goal-status-update.component';

describe('DialogGoalStatusUpdateComponent', () => {
  let component: DialogGoalStatusUpdateComponent;
  let fixture: ComponentFixture<DialogGoalStatusUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGoalStatusUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGoalStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
