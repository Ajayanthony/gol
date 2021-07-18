import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LtgHomeTabs } from 'src/app/common/constants';
import { LtGoal } from 'src/app/common/LtGoal';
import { LtgService } from 'src/app/service/ltg.service';
import { NotifierService } from 'src/app/service/notifier.service';

@Component({
  selector: 'app-lt-goal-card',
  templateUrl: './lt-goal-card.component.html',
  styleUrls: ['./lt-goal-card.component.css'],
})
export class LtGoalCardComponent implements OnInit {
  @Input('goalObj') goalObj!: LtGoal;
  @Input('tab') tab!: string;
  isCardVisible = true;
  isCardBodyVisible = false;

  constructor(
    private ltgService: LtgService,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  isCurrentLtgTab() {
    return this.tab === LtgHomeTabs[0].value;
  }

  handleStatusChange(newStatus: string) {
    if (this.goalObj?._id && this.tab !== newStatus) {
      this.ltgService
        .updateLtgStatus(this.goalObj._id, this.tab, newStatus)
        .subscribe((response: any) => {
          if (response.updatedCount > 0) {
            this.notifierService.notify('Lt Goal status updated.');
            this.isCardVisible = false;
          } else {
            this.notifierService.notify('Could not update Ltg status.');
          }
        });
    }
  }

  handleEdit() {
    this.ltgService.addLtgToEdit(this.goalObj);
    this.router.navigate(['ltform'], {
      relativeTo: this.route,
      queryParams: { action: 'edit', goalId: this.goalObj._id },
    });
  }

  handleDelete() {
    if (this.goalObj?._id) {
      this.ltgService.deleteLtg(this.goalObj._id).subscribe((response: any) => {
        if (response.result > 0) {
          this.notifierService.notify('Lt Goal Deleted.');
          this.isCardVisible = false;
        } else {
          this.notifierService.notify('Could not delete Lt Goal.');
        }
      });
    }
  }

  toggleCardBodyVisible() {
    this.isCardBodyVisible = !this.isCardBodyVisible;
  }
}
