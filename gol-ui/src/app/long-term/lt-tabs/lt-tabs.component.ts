import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import {
  LtgHomeTabs,
  GoalPriorities,
  PriorityIcons,
  LtgType,
} from 'src/app/common/constants';
import { LtGoal } from 'src/app/common/LtGoal';
import { LtgService } from 'src/app/service/ltg.service';
import { LtFormComponent } from '../lt-form/lt-form.component';

@Component({
  selector: 'app-lt-tabs',
  templateUrl: './lt-tabs.component.html',
  styleUrls: ['./lt-tabs.component.css'],
})
export class LtTabsComponent implements OnInit {
  displayedLtgs: { [key: string]: LtGoal[] } = {
    [GoalPriorities[0].value]: [],
    [GoalPriorities[1].value]: [],
    [GoalPriorities[2].value]: [],
  };
  typeFilter: FormControl = new FormControl({
    value: 'all',
    text: 'All Categories',
  });
  private fetchedLtgs: Array<LtGoal> = [];
  tabIndex: number = 0;
  ltgHomeTabs = LtgHomeTabs;
  Icons = PriorityIcons;
  goalTypes = LtgType;

  constructor(
    private ltgService: LtgService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getGoalsForTab(0);

    this.typeFilter.valueChanges.subscribe((change) =>
      this.updateDisplayedLtgs()
    );
  }

  showAddLtgForm() {
    this.ltgService.addLtgToEdit({} as LtGoal);
    // this.router.navigate(['ltform'], {
    //   relativeTo: this.route,
    //   queryParams: { action: 'add' },
    // });

    const dialogRef = this.dialog.open(LtFormComponent, {
      data: { action: 'add' },
      width: '65%',
      height: '65%',
      maxWidth: '100%',
    });

    dialogRef.afterClosed().subscribe((value) => {
      if(value === 'added') {
        this.getGoalsForTab(0);
      }
    });
  }

  getGoalsForTab(index: number) {
    this.tabIndex = index;
    this.ltgService
      .getLtgsForTab(LtgHomeTabs[index].value)
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
}
