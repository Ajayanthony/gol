import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { GoalPriorities } from '../common/constants';
import { IGoal } from '../common/Goal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css'],
})
export class GoalsListComponent implements OnChanges, OnDestroy {
  @Input('typeFilter') typeFilter: string | null = '';
  @Input('goalsList') rawList: IGoal[] | null = null;

  goalsList: { [key: string]: Array<IGoal> } = {};
  order = GoalPriorities;
  successGoals: Array<IGoal> = [];
  failureGoals: Array<IGoal> = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateGoalsList();
  }

  updateGoalsList() {
    this.goalsList = {};
    this.successGoals = [];
    this.failureGoals = [];

    for (let val of this.order) {
      this.goalsList[val.value] = [];
    }

    let tempList: Array<IGoal> =
      this.typeFilter === 'all'
        ? this.rawList!
        : this.rawList!.filter((goal) => goal.goal_type === this.typeFilter);

    for (let goal of tempList) {
      if (goal.status === 'in_progress') {
        this.goalsList[goal.priority].push(goal);
      } else if (goal.status === 'success') {
        this.successGoals.push(goal);
      } else if (goal.status === 'failure') {
        this.failureGoals.push(goal);
      }
    }
  }

  async ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
