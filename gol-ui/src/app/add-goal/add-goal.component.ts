import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  Intervals,
  GoalPriorities,
  GoalTypes,
  GoalStatuses,
} from '../common/constants';
import { IntervalService } from '../service/interval.service';
import { IGoal } from '../common/Goal';
import { BreakpointService } from '../service/breakpoint.service';
import { NotifierService } from '../service/notifier.service';
import { createSummaryText } from '../common/utils';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css'],
})
export class AddGoalComponent implements AfterViewInit {
  intervals = Intervals;
  goalPriorities = GoalPriorities;
  goalTypes = GoalTypes;
  formFieldClass = 'width100';
  interval: FormControl = new FormControl();
  startDate: FormControl = new FormControl();
  goalForm = this.fb.group({
    goalTitle: [null, Validators.required],
    goalDescription: null,
    goalPriority: [null, Validators.required],
    goalType: [null, Validators.required],
    targetValue: null,
  });
  ckEditor = ClassicEditor;
  summaryTitle = '';
  intervalDatesText = '';

  constructor(
    private fb: FormBuilder,
    private intervalService: IntervalService,
    public dialogRef: MatDialogRef<AddGoalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private breakPoint: BreakpointService,
    private notifierService: NotifierService
  ) {
    this.interval.setValue(data.interval);
    this.startDate.setValue(moment(data.startDate));
    [this.summaryTitle, this.intervalDatesText] = createSummaryText(
      data.interval,
      moment(data.startDate)
    );
    this.summaryTitle = this.summaryTitle.substring(0, this.summaryTitle.length - 1);
  }

  ngAfterViewInit(): void {
    this.breakPoint.getIsHandset$().subscribe((isHandset) => {
      if (isHandset) {
        this.dialogRef.updateSize('100%', '100%');
        this.formFieldClass = 'full-width';
      } else {
        this.dialogRef.updateSize('65%', '65%');
        this.formFieldClass = 'width100';
      }
    });
  }

  onSubmit(): void {
    if (this.goalForm.invalid) return;

    const formData: IGoal = {
      goal_title: this.goalForm.value.goalTitle,
      goal_description: this.goalForm.value.goalDescription,
      goal_type: this.goalForm.value.goalType,
      priority: this.goalForm.value.goalPriority,
      target_val: this.goalForm.value.targetValue,
      status: GoalStatuses[0].value,
    };

    this.intervalService
      .addIntervalGoal(this.interval.value, this.startDate.value, formData)
      .subscribe((response) => {
        this.notifierService.notify('Goal Added Successfully.');
        this.dialogRef.close(response);
      });
  }
}
