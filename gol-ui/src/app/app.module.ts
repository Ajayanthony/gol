import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GolHeaderComponent } from './gol-header/gol-header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IntervalDetailsComponent } from './interval-details/interval-details.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { GoalsListComponent } from './goals-list/goals-list.component';
import { GoalCardComponent } from './goal-card/goal-card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { DialogGoalStatusUpdateComponent } from './dialog-goal-status-update/dialog-goal-status-update.component';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogEditGoalComponent } from './dialog-edit-goal/dialog-edit-goal.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatChipsModule } from '@angular/material/chips';
import { DialogCopyGoalComponent } from './dialog-copy-goal/dialog-copy-goal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { LtFormComponent } from './long-term/lt-form/lt-form.component';
import { LtTabsComponent } from './long-term/lt-tabs/lt-tabs.component';
import { LtGoalCardComponent } from './long-term/lt-goal-card/lt-goal-card.component';
import { ObjectkeysPipe } from './common/objectkeys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GolHeaderComponent,
    IntervalDetailsComponent,
    AddGoalComponent,
    GoalsListComponent,
    GoalCardComponent,
    DialogGoalStatusUpdateComponent,
    DialogEditGoalComponent,
    DialogCopyGoalComponent,
    LtFormComponent,
    LtTabsComponent,
    LtGoalCardComponent,
    ObjectkeysPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    FormsModule,
    MatTooltipModule,
    MatDividerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatCheckboxModule,
    CKEditorModule,
    MatTabsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
