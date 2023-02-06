import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DialogCopyGoalComponent } from '../dialog-copy-goal/dialog-copy-goal.component';
import { NotifierService } from '../service/notifier.service';
import { IntervalService } from '../service/interval.service';
import { IGoal } from '../common/Goal';
import {
  GoalStatuses,
  GoalTypes,
  GoalPriorities,
  PriorityIcons,
} from '../common/constants';
import { DialogGoalStatusUpdateComponent } from '../dialog-goal-status-update/dialog-goal-status-update.component';
import { GoalService } from '../service/goal.service';
import { DialogEditGoalComponent } from '../dialog-edit-goal/dialog-edit-goal.component';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.css'],
})
export class GoalCardComponent implements OnInit {
  @Input('goalRef') goalObj!: IGoal;
  @Output('goalUpdated') goalUpdated: EventEmitter<void> = new EventEmitter();

  Statuses = GoalStatuses;
  Icons = PriorityIcons;
  isCardBodyVisible: boolean = false;

  goalStatus: FormControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private goalService: GoalService,
    private intervalService: IntervalService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.goalStatus.setValue(this.goalObj.status);
  }

  handleUpdateStatus(newStatus: string) {
    const dialogClosed$ = this.openStatusUpdateDialog(newStatus);
    this.saveGoalOnStatusUpdate(dialogClosed$);
  }

  openStatusUpdateDialog(newStatus: string) {
    const dialogRef = this.dialog.open(DialogGoalStatusUpdateComponent, {
      data: { status: newStatus, close_comment: 'N/A' },
      width: '50%',
    });

    return dialogRef.afterClosed();
  }

  saveGoalOnStatusUpdate(dialogClosed$: Observable<any>) {
    dialogClosed$
      .pipe(
        tap((result) => {
          //this check is for dialog-goal-status-update -> cancel button clicked
          if (!result) this.goalStatus.setValue(this.goalObj.status);
        }),
        filter((result) => !!result),
        switchMap((result) =>
          this.goalService
            .updateGoalStatus(this.goalObj.id!, result)
            .pipe(map((response) => [response, result]))
        )
      )
      .subscribe((combineRes) => {
        this.goalObj = Object.assign(this.goalObj, combineRes[1]);
        this.goalUpdated.emit();
      });
  }

  handleEditGoal() {
    const dialogClosed$ = this.openEditGoalDialog();
    this.saveEditedGoal(dialogClosed$);
  }

  openEditGoalDialog() {
    const dialogRef = this.dialog.open(DialogEditGoalComponent, {
      data: {
        goal: this.goalObj,
        saveEditedGoal: (dialogClosed$: Observable<any>) => {
          this.saveEditedGoal(dialogClosed$);
        },
        updateGoalStatus: (dialogClosed$: Observable<any>) => {
          this.saveGoalOnStatusUpdate(dialogClosed$);
        },
      },
      width: '90%',
      height: '90%',
      maxWidth: '100%',
    });

    return dialogRef.afterClosed();
  }

  saveEditedGoal(dialogClosed$: Observable<any>) {
    dialogClosed$
      .pipe(
        filter((newData) => !!newData && Object.keys(newData).length > 0),
        switchMap((newData) =>
          this.goalService
            .editGoal(this.goalObj.id!, newData)
            .pipe(map((response) => [response, newData]))
        )
      )
      .subscribe((combineRes: Array<any>) => {
        if (combineRes[0]?.result > 0) {
          this.goalObj = Object.assign(this.goalObj, combineRes[1]);
          this.goalUpdated.emit();
        }
      });
  }

  toggleCardBodyVisible() {
    this.isCardBodyVisible = !this.isCardBodyVisible;
  }

  getGoalType(val: string) {
    return GoalTypes.find((type) => type.value === val)?.text;
  }

  getGoalTypeIcon(val: string) {
    return GoalTypes.find((type) => type.value === val)?.icon;
  }

  getGoalTypeIconColor(val: string) {
    return GoalTypes.find((type) => type.value === val)?.icon_class;
  }

  getPriorityText(val: string) {
    return GoalPriorities.find((p) => p.value === val)?.text + ' Priority';
  }

  replaceUrls(message: string) {
    if (!message) return;

    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (url) {
      var hyperlink = url;
      if (!hyperlink.match('^https?://')) {
        hyperlink = 'http://' + hyperlink;
      }
      return (
        '<a href="' +
        hyperlink +
        '" target="_blank" rel="noopener noreferrer">' +
        url +
        '</a>'
      );
    });
  }

  handleCopyGoal() {
    const dialogRef = this.dialog.open(DialogCopyGoalComponent, {
      data: {
        goal: this.goalObj,
        startDate: moment(),
      },
      width: '100px',
      maxWidth: '100%',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (!!response)
        this.notifierService.notify(
          response.length + ' Goal(s) Created Successfully.'
        );
    });
  }

  handleDeleteGoal() {
    if (window.confirm('Confirm Delete')) {
      this.intervalService
        .deleteGoal(this.goalObj.id!)
        .subscribe((response: any) => {
          if (response.result > 0) {
            this.notifierService.notify('Goal Deleted');
          }
        });
    }
  }
}
