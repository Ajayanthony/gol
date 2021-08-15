import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, combineAll, concatAll, tap } from 'rxjs/operators';
import { IGoal } from '../common/Goal';
import * as moment from 'moment';
import { ErrorHandler } from './error-handler.service';
import {
  createIGoal,
  getAddCharacterForInterval,
  getHostURL,
  getIntervalBaseUrl,
} from '../common/utils';

@Injectable({
  providedIn: 'root',
})
export class IntervalService {
  private goalsList$ = new BehaviorSubject<IGoal[]>([]);
  private goalsList: Array<IGoal> = [];
  interval: string = 'daily';
  startDate: Moment = moment();

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) {}

  addIntervalGoal(interval: string, startDate: Moment, goal: IGoal) {
    const url = getHostURL() + getIntervalBaseUrl(interval);
    return this.http
      .post(url + startDate.format('DD-MM-YYYY'), goal)
      .pipe(catchError((error) => this.errorHandler.handleError(error)));
  }

  getIntervalGoals(interval: string, date: Moment) {
    this.interval = interval;
    this.startDate = date;
    const url = getHostURL() + getIntervalBaseUrl(interval);
    this.http
      .get<any>(url + date.format('DD-MM-YYYY'))
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((data) => {
        console.log(data);
        this.goalsList = !!data.interval_data
          ? data.interval_data!.goals_list.map(createIGoal)
          : [];
        this.publishGoalsListAndSummary();
      });
  }

  copyGoalToOtherInterval(
    interval: string,
    startDate: Moment,
    repeatCount: number,
    goalObj: IGoal
  ) {
    const ch = getAddCharacterForInterval(interval);
    const requests: Array<Observable<any>> = [];
    let count = 0;
    while (count <= repeatCount) {
      requests.push(this.addIntervalGoal(interval, startDate, goalObj));
      startDate.add(1, ch);
      count++;
    }
    return from(requests).pipe(combineAll());
  }

  deleteGoal(goalId: string) {
    const url = getHostURL() + getIntervalBaseUrl(this.interval);
    return this.http
      .post(url + 'delete/' + this.startDate.format('DD-MM-YYYY'), {
        goalId: goalId,
      })
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .pipe(tap(() => {
        this.goalsList = this.goalsList.filter(function (goal) {
          return goal.id != goalId;
        });
        this.publishGoalsListAndSummary();
      }));
  }

  publishGoalsListAndSummary() {
    this.goalsList$.next(this.goalsList);
  }

  getGoalsList$() {
    return this.goalsList$.asObservable();
  }
}
