import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

import { IntervalService } from '../service/interval.service';
import { Intervals, GoalTypes } from '../common/constants';
import { AddGoalComponent } from '../add-goal/add-goal.component';
import { IGoal } from '../common/Goal';
import { BreakpointService } from '../service/breakpoint.service';
import { createSummaryText } from '../common/utils';

@Component({
  selector: 'app-interval-details',
  templateUrl: './interval-details.component.html',
  styleUrls: ['./interval-details.component.css'],
})
export class IntervalDetailsComponent implements OnInit {
  goalsList$: Observable<IGoal[]> = new Observable();
  interval: string = 'weekly';
  startDate = new FormControl();
  typeFilter: FormControl = new FormControl({value:'all', text:'All Categories'});
  isHandset$: Observable<boolean>;
  summaryTitle = '';
  intervalDatesText = '';
  goalTypes = GoalTypes;

  constructor(
    private route: ActivatedRoute,
    private intervalService: IntervalService,
    public dialog: MatDialog,
    private breakPoint: BreakpointService
  ) {
    this.isHandset$ = breakPoint.getIsHandset$();
  }

  ngOnInit() {
    this.route.fragment
      .pipe(map((fragment) => fragment || 'weekly'))
      .subscribe((value) => {
        this.startDate.setValue(moment());
        this.interval = value;
        this.handleDateChange();
      });
    this.route.queryParams.subscribe((params) => {
      if (!!params.action && params.action === 'add') this.showAddGoalForm();
    });

    this.goalsList$ = this.intervalService.getGoalsList$();
  }

  handleDateChange() {
    [this.summaryTitle, this.intervalDatesText] = createSummaryText(
      this.interval,
      this.startDate.value
    );
    this.intervalService.getIntervalGoals(this.interval, this.startDate.value);
  }

  handleGoalAdded() {
    this.handleDateChange();
  }

  showAddGoalForm() {
    const dialogRef = this.dialog.open(AddGoalComponent, {
      data: { interval: this.interval, startDate: this.startDate.value },
      width: '65%',
      height: '65%',
      maxWidth: '100%',
    });

    dialogRef.afterClosed().subscribe((value) => {
      console.log(value);
      this.handleGoalAdded();
    });
  }

  nextDateButtonClickHandler(val: number) {
    let tempDate = moment(this.startDate.value);
    if (this.interval === Intervals[0].value) {
      tempDate.add(val, 'd');
    } else if (this.interval === Intervals[1].value) {
      tempDate.add(val, 'w');
    } else if (this.interval === Intervals[2].value) {
      tempDate.add(val, 'M');
    }

    this.startDate.setValue(tempDate);
    this.handleDateChange();
  }
}
