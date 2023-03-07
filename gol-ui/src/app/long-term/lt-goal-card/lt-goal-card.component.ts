import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LtgHomeTabs, PriorityIcons, LtgType, GoalPriorities } from 'src/app/common/constants';
import { LtGoal } from 'src/app/common/LtGoal';
import { LtgService } from 'src/app/service/ltg.service';
import { NotifierService } from 'src/app/service/notifier.service';
import { LtFormComponent } from '../lt-form/lt-form.component';

@Component({
  selector: 'app-lt-goal-card',
  templateUrl: './lt-goal-card.component.html',
  styleUrls: ['./lt-goal-card.component.css'],
})
export class LtGoalCardComponent implements OnInit, OnDestroy {
  @Input('goalObj') goalObj!: LtGoal;
  @Input('tab') tab!: string;
  @Output('goalUpdated') goalUpdated: EventEmitter<void> = new EventEmitter();
  isCardVisible = true;
  isCardBodyVisible = false;
  Icons = PriorityIcons;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private ltgService: LtgService,
    private notifierService: NotifierService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  isCurrentLtgTab() {
    return this.tab === LtgHomeTabs[0].value;
  }

  handleStatusChange(newStatus: string) {
    if (this.goalObj?._id && this.tab !== newStatus) {
      this.ltgService
        .updateLtgStatus(this.goalObj._id, this.tab, newStatus)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          if (response.updatedCount > 0) {
            this.notifierService.notify('Lt Goal status updated.');
            this.isCardVisible = false;
          } else {
            this.notifierService.notify('Could not update Ltg status.');
          }
        });
    }
  }

  handleEdit() {
    this.ltgService.addLtgToEdit(this.goalObj);

    const dialogRef = this.dialog.open(LtFormComponent, {
      data: { action: 'edit', goalId: this.goalObj._id },
      width: '65%',
      height: '65%',
      maxWidth: '100%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value === 'edited') {
          this.goalUpdated.emit();
        }
      });
  }

  handleDelete() {
    if (this.goalObj?._id) {
      this.ltgService
        .deleteLtg(this.goalObj._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          if (response.result > 0) {
            this.notifierService.notify('Lt Goal Deleted.');
            this.isCardVisible = false;
          } else {
            this.notifierService.notify('Could not delete Lt Goal.');
          }
        });
    }
  }

  toggleCardBodyVisible() {
    this.isCardBodyVisible = !this.isCardBodyVisible;
  }

  getGoalTypeIcon(val: string) {
    return LtgType.find((type) => type.value === val)?.icon;
  }

  getGoalTypeIconColor(val: string) {
    return LtgType.find((type) => type.value === val)?.icon_class;
  }

  getPriorityText(val: string) {
    return GoalPriorities.find((p) => p.value === val)?.text + ' Priority';
  }

  async ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
