import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LtgSortFields } from 'src/app/common/constants';
import { LtGoal } from 'src/app/common/LtGoal';
import { BreakpointService } from 'src/app/service/breakpoint.service';
import { LtgService } from 'src/app/service/ltg.service';

@Component({
  selector: 'app-lt-home',
  templateUrl: './lt-home.component.html',
  styleUrls: ['./lt-home.component.css'],
})
export class LtHomeComponent implements OnInit {
  isHandset$: Observable<boolean>;
  sortFields = LtgSortFields;

  constructor(
    private ltgService: LtgService,
    private breakPoint: BreakpointService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isHandset$ = breakPoint.getIsHandset$();
  }

  ngOnInit(): void {}

  showAddLtgForm() {
    this.ltgService.addLtgToEdit({} as LtGoal);
    this.router.navigate(['ltform'], {
      relativeTo: this.route,
      queryParams: { action: 'add' },
    });
  }

  updateSortField(field: string) {
    this.ltgService.setSortField(field);
  }
}
