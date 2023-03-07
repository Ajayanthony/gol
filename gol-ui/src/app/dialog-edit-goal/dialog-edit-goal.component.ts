import { AfterViewInit, Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import * as constants from '../common/constants';
import { IGoal } from '../common/Goal';
import { BreakpointService } from '../service/breakpoint.service';

let timeoutId: number;

@Component({
  selector: 'app-dialog-edit-goal',
  templateUrl: './dialog-edit-goal.component.html',
  styleUrls: ['./dialog-edit-goal.component.css'],
})
export class DialogEditGoalComponent implements OnInit, AfterViewInit, OnDestroy {
  goalPriorities = constants.GoalPriorities;
  goalTypes = constants.GoalTypes;
  Statuses = constants.GoalStatuses;
  goalStatus: FormControl = new FormControl();
  prevGoal?: IGoal;
  newData: any = {};
  autoSavedText: string = '';
  ckEditor = ClassicEditor;
  destroy$: Subject<boolean> = new Subject<boolean>();

  goalForm = this.fb.group({
    goalTitle: [null, Validators.required],
    goalDescription: null,
    goalPriority: [null, Validators.required],
    goalType: [null, Validators.required],
    actualValue: null,
    targetValue: null,
    closeComment: null,
  });

  constructor(
    public dialogRef: MatDialogRef<DialogEditGoalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      goal: IGoal;
      saveEditedGoal: CallableFunction;
      updateGoalStatus: CallableFunction;
    },
    private breakPoint: BreakpointService
  ) {
    //Clear timer before closing to avoid auto save after clicking cancel
    this.dialogRef
      .afterClosed()
      .pipe(
        tap(() => {
          this.clearTimer();
        })
      )
      .subscribe(() => {});
  }

  ngOnInit(): void {
    this.goalStatus.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        if (val !== 'in_progress')
          this.goalForm.controls['closeComment'].enable({ emitEvent: false });
        else
          this.goalForm.controls['closeComment'].disable({ emitEvent: false });
      });

    this.prevGoal = this.data.goal;

    this.goalForm.setValue({
      goalTitle: this.prevGoal.goal_title,
      goalDescription: this.prevGoal.goal_description,
      goalPriority: this.prevGoal.priority,
      goalType: this.prevGoal.goal_type,
      actualValue: this.prevGoal.actual_val,
      targetValue: this.prevGoal.target_val,
      closeComment: this.prevGoal.close_comment || null,
    });

    this.goalStatus.setValue(this.prevGoal.status);

    this.goalForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onFormFieldChange();
    });
  }

  ngAfterViewInit(): void {
    this.breakPoint
      .getIsHandset$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isHandset) => {
        if (isHandset) {
          this.dialogRef.updateSize('100%', '100%');
        } else {
          this.dialogRef.updateSize('90%', '90%');
        }
      });
  }

  onSubmit() {
    if (this.goalForm.invalid) return;
    this.clearTimer();
    this.updateNewData();
    this.dialogRef.close(this.newData);
  }

  onFormFieldChange() {
    this.clearTimer();
    this.autoSavedText = 'Goal has unsaved changes.';
    timeoutId = window.setTimeout(() => {
      if (this.goalForm.invalid) return;

      this.updateNewData();
      this.data.saveEditedGoal(of(this.newData));
      this.autoSavedText = 'Auto save triggered.';
    }, 30000);
  }

  onStatusUpdate() {
    this.data.updateGoalStatus(of({ status: this.goalStatus.value }));
  }

  private clearTimer() {
    if (!!timeoutId) window.clearTimeout(timeoutId);
  }

  private updateNewData() {
    this.newData = {};

    if (this.goalForm.get('goalTitle')?.value !== this.prevGoal!.goal_title) {
      this.newData.goal_title = this.goalForm.get('goalTitle')?.value;
    }
    if (
      this.goalForm.get('goalDescription')?.value !==
      this.prevGoal!.goal_description
    ) {
      this.newData.goal_description =
        this.goalForm.get('goalDescription')?.value;
    }
    if (this.goalForm.get('goalPriority')?.value !== this.prevGoal!.priority) {
      this.newData.priority = this.goalForm.get('goalPriority')?.value;
    }
    if (this.goalForm.get('goalType')?.value !== this.prevGoal!.goal_type) {
      this.newData.goal_type = this.goalForm.get('goalType')?.value;
    }
    if (this.goalForm.get('actualValue')?.value !== this.prevGoal!.actual_val) {
      this.newData.actual_val = this.goalForm.get('actualValue')?.value;
    }
    if (this.goalForm.get('targetValue')?.value !== this.prevGoal!.target_val) {
      this.newData.target_val = this.goalForm.get('targetValue')?.value;
    }
    if (
      this.goalForm.get('closeComment')?.value !== this.prevGoal!.close_comment
    ) {
      this.newData.close_comment = this.goalForm.get('closeComment')?.value;
    }
  }

  async ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
