import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoalStatuses } from '../common/constants';
import { getStatusText } from '../common/utils';

@Component({
  selector: 'app-dialog-goal-status-update',
  templateUrl: './dialog-goal-status-update.component.html',
  styleUrls: ['./dialog-goal-status-update.component.css'],
})
export class DialogGoalStatusUpdateComponent implements OnInit {
  Statuses = GoalStatuses;
  status: string;
  constructor(
    public dialogRef: MatDialogRef<DialogGoalStatusUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.status = getStatusText(data.status);
  }

  ngOnInit(): void {}
}
