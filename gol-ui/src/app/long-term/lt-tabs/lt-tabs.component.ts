import { Component, OnInit } from '@angular/core';
import {
  LtgHomeTabs,
  GoalPriorities,
  LtgType,
  LtgSortFields,
} from 'src/app/common/constants';
import { LtGoal } from 'src/app/common/LtGoal';
import { LtgService } from 'src/app/service/ltg.service';

@Component({
  selector: 'app-lt-tabs',
  templateUrl: './lt-tabs.component.html',
  styleUrls: ['./lt-tabs.component.css'],
})
export class LtTabsComponent implements OnInit {
  private ltgByPriority: { [key: string]: LtGoal[] } = {
    [GoalPriorities[0].value]: [],
    [GoalPriorities[1].value]: [],
    [GoalPriorities[2].value]: [],
  };
  private ltgByType: { [key: string]: LtGoal[] } = {
    [LtgType[0].value]: [],
    [LtgType[1].value]: [],
  };
  currentLtgs: { [key: string]: LtGoal[] } = {};
  tabIndex: number = 0;
  ltgHomeTabs = LtgHomeTabs;
  sortBy: string = LtgSortFields[0];

  constructor(private ltgService: LtgService) {
    ltgService.getSortField$().subscribe((field: string) => {
      this.sortBy = field;
      this.handleTabChange(this.tabIndex);
    });
  }

  ngOnInit(): void {
    this.handleTabChange(0);
  }

  getCurrentLtgs(goalsList: LtGoal[]) {
    this.clearCurrentLists();
    goalsList.forEach((ltg) => {
      this.ltgByPriority[ltg.priority].push(ltg);
      this.ltgByType[ltg.goal_type].push(ltg);
    });
    this.updateDisplayedList();
  }

  handleTabChange(index: number) {
    this.tabIndex = index;
    this.ltgService
      .getLtgsForTab(LtgHomeTabs[index].value)
      .subscribe((goalsList) => {
        this.getCurrentLtgs(goalsList);
      });
  }

  private clearCurrentLists() {
    //https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    for (let priority in this.ltgByPriority) {
      this.ltgByPriority[priority].length = 0;
    }
    for (let goalType in this.ltgByType) {
      this.ltgByType[goalType].length = 0;
    }
  }

  private updateDisplayedList() {
    if (this.sortBy === LtgSortFields[0]) {
      this.currentLtgs = this.ltgByPriority;
    } else {
      this.currentLtgs = this.ltgByType;
    }
  }
}
