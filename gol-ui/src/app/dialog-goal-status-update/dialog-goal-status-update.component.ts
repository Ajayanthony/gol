import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { GoalStatuses } from '../common/constants';
import { getStatusText } from '../common/utils';

@Component({
  selector: 'app-dialog-goal-status-update',
  templateUrl: './dialog-goal-status-update.component.html',
  styleUrls: ['./dialog-goal-status-update.component.css'],
})
export class DialogGoalStatusUpdateComponent implements OnInit, OnDestroy {
  Statuses = GoalStatuses;
  status: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    public dialogRef: MatDialogRef<DialogGoalStatusUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.status = getStatusText(data.status);
  }

  ngOnInit(): void {}

  async ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
