import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  GoalPriorities,
  GoalStatuses,
  GoalTypes,
  SortFields,
} from '../common/constants';
import { IGoal } from '../common/Goal';
import { getGoalFieldGetterFn } from '../common/utils';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css'],
})
export class GoalsListComponent implements OnChanges {
  @Input('sortBy') sortBy: string = '';
  @Input('goalsList') rawList: IGoal[] | null = null;

  goalsList: { [key: string]: Array<IGoal> } = {};
  order: { value: string; text: string; desc: string }[] = [];
  stats: { [key: string]: number } = this.resetStats();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortBy']?.currentValue) {
      this.setSortByField(changes['sortBy'].currentValue);
    }
    this.updateGoalsList();
  }

  updateGoalsList() {
    this.goalsList = {};
    this.stats = this.resetStats();
    const field = this.getSortByField();
    this.setOrderObjectForField(field);
    const fn = getGoalFieldGetterFn(field);
    for (let val of this.order) {
      this.goalsList[val.value] = [];
    }

    for (let goal of this.rawList!) {
      this.stats[goal.status] = this.stats[goal.status] + 1;
      this.stats['total'] = this.stats['total'] + 1;
      this.goalsList[fn(goal)].push(goal);
    }
  }

  private setOrderObjectForField(field: string) {
    this.order = GoalPriorities;
    if (field === SortFields[1]) {
      this.order = GoalStatuses;
    } else if (field === SortFields[2]) {
      this.order = GoalTypes;
    }
  }

  private getSortByField() {
    const sortByFieldFromLS = localStorage.getItem('sortByField');
    if (!sortByFieldFromLS) {
      return 'status';
    }
    return sortByFieldFromLS;
  }

  private setSortByField(field: string) {
    localStorage.setItem('sortByField', field);
  }

  private resetStats(): { [key: string]: number } {
    return {
      in_progress: 0,
      success: 0,
      failure: 0,
      total: 0,
    };
  }
}
