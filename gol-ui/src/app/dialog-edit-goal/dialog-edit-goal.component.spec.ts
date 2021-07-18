import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditGoalComponent } from './dialog-edit-goal.component';

describe('DialogEditGoalComponent', () => {
  let component: DialogEditGoalComponent;
  let fixture: ComponentFixture<DialogEditGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
