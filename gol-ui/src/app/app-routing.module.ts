import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntervalDetailsComponent } from './interval-details/interval-details.component';
import { LtTabsComponent } from './long-term/lt-tabs/lt-tabs.component';
import { CombinedListComponent } from './combined-list/combined-list.component';

const routes: Routes = [
  { path: 'interval-details', component: IntervalDetailsComponent },
  { path: 'longterm', component: LtTabsComponent },
  { path: 'all', component: CombinedListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
