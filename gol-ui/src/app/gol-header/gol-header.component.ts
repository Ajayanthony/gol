import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Intervals } from '../common/constants';
import { BreakpointService } from '../service/breakpoint.service';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gol-header',
  templateUrl: './gol-header.component.html',
  styleUrls: ['./gol-header.component.css'],
})
export class GolHeaderComponent {
  intervals = Intervals;
  isHandset$: Observable<boolean> = this.breakpoint.getIsHandset$();

  constructor(
    private breakpoint: BreakpointService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public sendAddGoalQueryParam() {
    const queryParams: Params = { action: 'add' };
    this.activatedRoute.data.subscribe(console.log);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
  }
}
