import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
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
  providers: [IntervalService],
})
export class IntervalDetailsComponent implements OnInit, OnDestroy {
  goalsList$: Observable<IGoal[]> = new Observable();
  @Input('interval') interval: string = 'weekly';
  startDate = new FormControl();
  allCategorySelectOption = {
    value: 'all',
    text: 'All Categories',
  };
  typeFilter: FormControl = new FormControl(this.allCategorySelectOption);
  isHandset$: Observable<boolean>;
  summaryTitle = '';
  intervalDatesText = '';
  goalTypes = GoalTypes;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private intervalService: IntervalService,
    public dialog: MatDialog,
    private breakPoint: BreakpointService
  ) {
    this.isHandset$ = breakPoint.getIsHandset$().pipe(takeUntil(this.destroy$));
  }

  ngOnInit() {
    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.startDate.setValue(moment());
      if (value) this.interval = value;
      this.handleDateChange();
    });

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (!!params.action && params.action === 'add') this.showAddGoalForm();
      });

    this.goalsList$ = this.intervalService
      .getGoalsList$()
      .pipe(takeUntil(this.destroy$));
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
      width: '80%',
      height: '75%',
      maxWidth: '100%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
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

  async ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
