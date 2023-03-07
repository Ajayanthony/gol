import { Component, OnDestroy } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Intervals } from '../common/constants';
import { BreakpointService } from '../service/breakpoint.service';

@Component({
  selector: 'app-gol-header',
  templateUrl: './gol-header.component.html',
  styleUrls: ['./gol-header.component.css'],
})
export class GolHeaderComponent implements OnDestroy {
  intervals = Intervals;
  isHandset$: Observable<boolean>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private breakpoint: BreakpointService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isHandset$ = breakpoint.getIsHandset$().pipe(takeUntil(this.destroy$));
  }

  public sendAddGoalQueryParam() {
    const queryParams: Params = { action: 'add' };
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy$))
      .subscribe(console.log);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
  }

  async ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
