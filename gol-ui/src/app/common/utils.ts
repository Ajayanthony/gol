import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { GoalStatuses, Intervals, ltgDateFormat, SortFields } from './constants';
import { IGoal } from './Goal';
import { Moment } from 'moment';

export function getStatusText(value: string): string {
  let status = GoalStatuses[0].text;
  for (const st of GoalStatuses) {
    if (st.value === value) {
      status = st.text;
    }
  }
  return status;
}

export function getHostURL(): string {
  // console.log(
  //   window.location.protocol + '//' + window.location.hostname + ":" + 11002
  // );
  return window.location.protocol + '//10.0.0.224:11002';
}

export function getIntervalBaseUrl(interval: string): string {
  let url = Intervals[0].baseUrl;
  for (const entry of Intervals) {
    if (entry.value === interval) {
      url = entry.baseUrl;
      break;
    }
  }
  return url;
}

export function createIGoal(goal: any) {
  let iGoal: IGoal = {
    id: goal._id,
    goal_title: goal.goal_title,
    goal_description: goal.goal_description,
    goal_type: goal.goal_type,
    created_date: moment(goal.created_date),
    updated_date: moment(goal.updated_date),
    priority: goal.priority,
    actual_val: goal.actual_val,
    target_val: goal.target_val,
    status: goal.status,
    close_comment: goal.close_comment,
  };
  return iGoal;
}

export function getAddCharacterForInterval(interval: string) {
  if (interval === Intervals[0].value) {
    return 'd';
  } else if (interval === Intervals[1].value) {
    return 'w';
  } else if (interval === Intervals[2].value) {
    return 'M';
  }
  return 'd';
}

export function createLtGoal(ltg: any) {
  ltg.created_date = moment(ltg.created_date, ltgDateFormat);
  ltg.updated_date = moment(ltg.updated_date, ltgDateFormat);
  ltg.target_date = moment(ltg.target_date, ltgDateFormat);
  return ltg;
}

export function createSummaryText(
  interval: string,
  startDate: Moment,
  isHandset: Observable<boolean>
): string[] {
  let summaryTitle = '';
  let intervalDatesText = '';
  if (interval === Intervals[0].value) {
    summaryTitle = 'Daily Goals';
    intervalDatesText = startDate.format('dddd, Do MMMM YYYY');
  } else if (interval === Intervals[1].value) {
    const tempStartDate = moment(startDate);
    const weekStart: Moment =
      tempStartDate.day() == 0 ? tempStartDate.day(-6) : tempStartDate.day(1);
    summaryTitle = 'Weekly Goals';
    intervalDatesText =
      weekStart.format(isHandset ? 'Do' : 'Do MMM') +
      ' to ' +
      weekStart.add(6, 'days').format(isHandset ? 'Do' : 'Do MMM');
  } else if (interval === Intervals[2].value) {
    summaryTitle = 'Monthly Goals';
    intervalDatesText = startDate.format('MMMM YYYY');
  }

  return [summaryTitle, intervalDatesText];
}