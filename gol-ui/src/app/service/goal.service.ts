import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from '../common/constants';
import { getHostURL } from '../common/utils';
import { ErrorHandler } from './error-handler.service';
import { NotifierService } from './notifier.service';

const updateGoalStatusUrl = getHostURL() + API_URL + 'goal/statusupdate/';
const editGoalUrl = getHostURL() + API_URL + 'goal/edit/';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
    private errorHandler: ErrorHandler
  ) {}

  updateGoalStatus(goalId: string, data: any) {
    console.log(data);
    return this.http
      .post(updateGoalStatusUrl + goalId, data)
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .pipe(
        tap(() => {
          this.notifierService.notify('Goal Status Updated.');
        })
      );
  }

  editGoal(goalId: string, data: any) {
    console.log(data);
    return this.http
      .post(editGoalUrl + goalId, data)
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .pipe(
        tap(() => {
          this.notifierService.notify('Goal Updated Successfully.');
        })
      );
  }
}
