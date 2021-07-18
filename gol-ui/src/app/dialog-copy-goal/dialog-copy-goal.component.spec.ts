import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCopyGoalComponent } from './dialog-copy-goal.component';

describe('DialogCopyGoalComponent', () => {
  let component: DialogCopyGoalComponent;
  let fixture: ComponentFixture<DialogCopyGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCopyGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCopyGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
