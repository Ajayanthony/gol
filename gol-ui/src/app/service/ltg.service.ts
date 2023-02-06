import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_URL } from '../common/constants';
import { LtGoal } from '../common/LtGoal';
import { createLtGoal, getHostURL } from '../common/utils';
import { ErrorHandler } from './error-handler.service';

const ltUrl = getHostURL() + API_URL + 'longterm/';

@Injectable({
  providedIn: 'root',
})
export class LtgService {
  private ltgToEdit: Subject<LtGoal> = new BehaviorSubject<LtGoal>(
    {} as LtGoal
  );

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) {}

  addLtgToEdit(ltg: LtGoal) {
    this.ltgToEdit.next(ltg);
  }

  // getLtgToEdit$() {
  //   return this.ltgToEdit.asObservable();
  // }

  addLtg(ltg: any) {
    return this.http
      .post(ltUrl + 'add', ltg)
      .pipe(catchError((error) => this.errorHandler.handleError(error)));
  }

  getLtgById(goalId: string) {
    return this.http
      .get(ltUrl + 'id/' + goalId)
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .pipe(
        map((response: any) => {
          return response.ltg ? createLtGoal(response.ltg) : null;
        })
      );
  }

  getLtgsForTab(tab: string) {
    return this.http
      .get(ltUrl + 'all/' + tab)
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .pipe(
        map((response: any) => {
          return response.goals_list.map((goal: any) => createLtGoal(goal));
        })
      );
  }

  deleteLtg(goalId: string) {
    return this.http
      .post(ltUrl + 'delete', { goalId: goalId })
      .pipe(catchError((error) => this.errorHandler.handleError(error)));
  }

  updateLtgStatus(goalId: string, prevStatus: string, newStatus: string) {
    return this.http
      .post(ltUrl + 'statusupdate/' + goalId, {
        prevStatus: prevStatus,
        newStatus: newStatus,
      })
      .pipe(catchError((error) => this.errorHandler.handleError(error)));
  }

  editLtg(goalId: string, changes: any) {
    return this.http
      .post(ltUrl + 'edit/' + goalId, changes)
      .pipe(catchError((error) => this.errorHandler.handleError(error)));
  }
}
