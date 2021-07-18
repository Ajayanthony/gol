import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntervalDetailsComponent } from './interval-details/interval-details.component';
import { LtFormComponent } from './long-term/lt-form/lt-form.component';
import { LtHomeComponent } from './long-term/lt-home/lt-home.component';
import { LtTabsComponent } from './long-term/lt-tabs/lt-tabs.component';

const routes: Routes = [
  { path: 'interval-details', component: IntervalDetailsComponent },
  {
    path: 'longterm',
    component: LtHomeComponent,
    children: [
      { path: '', component: LtTabsComponent },
      { path: 'ltform', component: LtFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
