import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  LtgHomeTabs,
  GoalPriorities,
  PriorityIcons,
  LtgType,
} from 'src/app/common/constants';
import { LtGoal } from 'src/app/common/LtGoal';
import { BreakpointService } from 'src/app/service/breakpoint.service';
import { LtgService } from 'src/app/service/ltg.service';
import { LtFormComponent } from '../lt-form/lt-form.component';

@Component({
  selector: 'app-lt-tabs',
  templateUrl: './lt-tabs.component.html',
  styleUrls: ['./lt-tabs.component.css'],
})
export class LtTabsComponent implements OnInit, OnDestroy {
  displayedLtgs: { [key: string]: LtGoal[] } = {
    [GoalPriorities[0].value]: [],
    [GoalPriorities[1].value]: [],
    [GoalPriorities[2].value]: [],
  };
  allCategorySelectOption = {
    value: 'all',
    text: 'All Categories',
  };
  typeFilter: FormControl = new FormControl(this.allCategorySelectOption);
  currentStatus: FormControl = new FormControl(LtgHomeTabs[0]);
  private fetchedLtgs: Array<LtGoal> = [];
  ltgHomeTabs = LtgHomeTabs;
  Icons = PriorityIcons;
  goalTypes = LtgType;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isHandset$: Observable<boolean>;
  
  constructor(
    private ltgService: LtgService,
    public dialog: MatDialog,
    private breakPoint: BreakpointService
  ) {
    this.isHandset$ = breakPoint.getIsHandset$().pipe(takeUntil(this.destroy$));
  }

  ngOnInit(): void {
    this.getGoalsForTab();

    this.typeFilter.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateDisplayedLtgs());

    this.currentStatus.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getGoalsForTab());
  }

  showAddLtgForm() {
    this.ltgService.addLtgToEdit({} as LtGoal);
    // this.router.navigate(['ltform'], {
    //   relativeTo: this.route,
    //   queryParams: { action: 'add' },
    // });

    const dialogRef = this.dialog.open(LtFormComponent, {
      data: { action: 'add' },
      width: '90%',
      height: '90%',
      maxWidth: '100%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value === 'added') {
          this.getGoalsForTab();
        }
      });
  }

  getGoalsForTab() {
    this.ltgService
      .getLtgsForTab(this.currentStatus.value.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((goalsList) => {
        this.fetchedLtgs = goalsList;
        this.updateDisplayedLtgs();
      });
  }

  updateDisplayedLtgs() {
    this.clearCurrentLists();
    this.fetchedLtgs.forEach((ltg) => {
      if (
        this.typeFilter.value.value === 'all' ||
        this.typeFilter.value.value === ltg.goal_type
      ) {
        this.displayedLtgs[ltg.priority].push(ltg);
      }
    });
  }

  private clearCurrentLists() {
    //https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    for (let priority in this.displayedLtgs) {
      this.displayedLtgs[priority].length = 0;
    }
  }

  async ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
