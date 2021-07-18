import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Intervals } from '../common/constants';
import { IGoal } from '../common/Goal';
import { DialogEditGoalComponent } from '../dialog-edit-goal/dialog-edit-goal.component';
import { BreakpointService } from '../service/breakpoint.service';
import { IntervalService } from '../service/interval.service';

@Component({
  selector: 'app-dialog-copy-goal',
  templateUrl: './dialog-copy-goal.component.html',
  styleUrls: ['./dialog-copy-goal.component.css'],
})
export class DialogCopyGoalComponent implements OnInit, AfterViewInit {
  copyForm = this.fb.group({
    interval: [null, Validators.required],
    startDate: null,
    repeatCount: null,
  });
  intervals = Intervals;
  isRepeated: FormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<DialogEditGoalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      goal: IGoal;
      startDate: moment.Moment;
    },
    private breakPoint: BreakpointService,
    private intervalService: IntervalService
  ) {
    this.copyForm.setValue({
      interval: null,
      startDate: moment(data.startDate),
      repeatCount: 0,
    });
  }

  ngOnInit(): void {
    this.copyForm.controls['repeatCount'].disable({ emitEvent: false });
  }

  ngAfterViewInit(): void {
    this.breakPoint.getIsHandset$().subscribe((isHandset) => {
      if (isHandset) {
        this.dialogRef.updateSize('100%', '100%');
      } else {
        this.dialogRef.updateSize('300px');
      }
    });
  }

  onSubmit(): void {
    if (this.copyForm.invalid) return;

    this.intervalService
      .copyGoalToOtherInterval(
        this.copyForm.controls['interval'].value,
        moment(this.copyForm.controls['startDate'].value),
        this.isRepeated.value ? this.copyForm.controls['repeatCount'].value : 0,
        this.data.goal
      )
      .subscribe((response) => {
        this.dialogRef.close(response);
      });
  }

  isRepeatedChanged(value: MatCheckboxChange) {
    if (value.checked)
      this.copyForm.controls['repeatCount'].enable({ emitEvent: false });
    else this.copyForm.controls['repeatCount'].disable({ emitEvent: false });
  }

  handleIntervalChange() {
    if (this.copyForm.get('interval')?.value === 'monthly') {
      this.isRepeated.disable();
      this.isRepeated.setValue(false);
      this.copyForm.controls['repeatCount'].disable({ emitEvent: false });
    } else {
      this.isRepeated.enable();
      if (this.isRepeated.value) {
        this.copyForm.controls['repeatCount'].enable({ emitEvent: false });
      }
    }
  }
}
