import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';
import {
  GoalPriorities,
  ltgDateFormat,
  LtgType,
} from 'src/app/common/constants';

import { LtGoal } from 'src/app/common/LtGoal';
import { LtgService } from 'src/app/service/ltg.service';
import { NotifierService } from 'src/app/service/notifier.service';

export enum FormType {
  ADD = 'add',
  EDIT = 'edit',
}

@Component({
  selector: 'app-lt-form',
  templateUrl: './lt-form.component.html',
  styleUrls: ['./lt-form.component.css'],
})
export class LtFormComponent implements OnInit {
  baseLtg: LtGoal = {} as LtGoal;
  formType!: FormType;
  goalId: string | null = null;
  ltgForm!: FormGroup;
  ckEditor = ClassicEditor;
  formTitle: string = '';
  goalPriorities = GoalPriorities;
  ltgTypes = LtgType;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notifierService: NotifierService,
    private ltgService: LtgService,
    private router: Router
  ) {
    this.setupLtgForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('open form');
      if (params.action === 'add') {
        this.formType = FormType.ADD;
        this.formTitle = 'Add New LTG';
        this.baseLtg = {} as LtGoal;
        this.updateLtgFormValues();
      } else if (params.action === 'edit' && params.goalId) {
        this.formType = FormType.EDIT;
        this.formTitle = 'Edit LTG';
        this.goalId = params.goalId;
        this.ltgService.getLtgById(this.goalId!).subscribe((ltg) => {
          if (ltg) {
            this.baseLtg = ltg;
            this.updateLtgFormValues();
          } else {
            this.navigateToLtgPage();
            this.notifierService.notify('Could not load LT Goal.');
          }
        });
      } else {
        this.notifierService.notify('Edit Error: Goal Id was not passed.');
        this.navigateToLtgPage();
      }
    });
  }

  isFormTypeEdit() {
    return this.formType === FormType.EDIT;
  }

  navigateToLtgPage() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }

  onSave() {
    if (this.ltgForm.invalid) {
      this.notifierService.notify('Error: Required Fields are not filled.');
      return;
    }

    if (this.formType === FormType.ADD) {
      this.handleAddGoal();
    } else if (this.formType === FormType.EDIT) {
      this.handleEditGoal();
    }
  }

  handleAddGoal() {
    const changeObj = this.createChangedFieldsObj();

    this.ltgService.addLtg(changeObj).subscribe((response: any) => {
      if (response.goalId) {
        this.notifierService.notify('Lt Goal created successfully.');
      } else {
        this.notifierService.notify('Lt Goal add request did not succeed.');
      }
      this.navigateToLtgPage();
    });
  }

  handleEditGoal() {
    const changeObj = this.createChangedFieldsObj();
    if (changeObj && Object.keys(changeObj).length === 0) {
      this.notifierService.notify('Form is unchanged.');
      return;
    }
    changeObj.prev_updated_date =
      this.baseLtg?.updated_date.format(ltgDateFormat);
    this.ltgService
      .editLtg(this.goalId!, changeObj)
      .subscribe((response: any) => {
        if (response.result > 0) {
          this.notifierService.notify('Lt Goal edit was successful.');
        } else {
          this.notifierService.notify('Lt Goal edit request did not succeed.');
        }
        this.navigateToLtgPage();
      });
  }

  private createChangedFieldsObj() {
    const newData: any = {};

    if (this.ltgForm.get('goalTitle')?.value !== this.baseLtg?.goal_title) {
      newData.goal_title = this.ltgForm.get('goalTitle')?.value;
    }
    if (this.ltgForm.get('description')?.value !== this.baseLtg?.description) {
      newData.description = this.ltgForm.get('description')?.value;
    }
    if (this.ltgForm.get('outcome')?.value !== this.baseLtg?.outcome) {
      newData.outcome = this.ltgForm.get('outcome')?.value;
    }
    if (this.ltgForm.get('obstacles')?.value !== this.baseLtg?.obstacles) {
      newData.obstacles = this.ltgForm.get('obstacles')?.value;
    }
    if (this.ltgForm.get('plan')?.value !== this.baseLtg?.plan) {
      newData.plan = this.ltgForm.get('plan')?.value;
    }
    if (this.ltgForm.get('priority')?.value !== this.baseLtg?.priority) {
      newData.priority = this.ltgForm.get('priority')?.value;
    }
    if (this.ltgForm.get('goalType')?.value !== this.baseLtg?.goal_type) {
      newData.goal_type = this.ltgForm.get('goalType')?.value;
    }
    if (
      this.ltgForm.get('targetDate')?.value.format(ltgDateFormat) !==
      this.baseLtg?.target_date?.format(ltgDateFormat)
    ) {
      newData.target_date = this.ltgForm
        .get('targetDate')
        ?.value.format(ltgDateFormat);
    }
    if (this.ltgForm.get('totalParts')?.value !== this.baseLtg?.total_parts) {
      newData.total_parts = this.ltgForm.get('totalParts')?.value;
    }
    if (
      this.formType === FormType.EDIT &&
      this.ltgForm.get('completedParts')?.value !==
        this.baseLtg?.completed_parts
    ) {
      newData.completed_parts = this.ltgForm.get('completedParts')?.value;
    }
    if (
      this.formType === FormType.EDIT &&
      this.ltgForm.get('closingComment')?.value !==
        this.baseLtg?.closing_comment
    ) {
      newData.closing_comment = this.ltgForm.get('closingComment')?.value;
    }
    return newData;
  }

  private setupLtgForm() {
    this.ltgForm = this.fb.group({
      goalTitle: [this.baseLtg?.goal_title ?? '', Validators.required],
      description: this.baseLtg?.description ?? '',
      outcome: this.baseLtg?.outcome ?? '',
      obstacles: this.baseLtg?.obstacles ?? '',
      plan: this.baseLtg?.plan ?? '',
      priority: [this.baseLtg?.priority ?? null, Validators.required],
      goalType: [this.baseLtg?.goal_type ?? null, Validators.required],
      targetDate: this.baseLtg?.target_date
        ? moment(this.baseLtg?.target_date)
        : moment(),
      totalParts: [this.baseLtg?.total_parts ?? 0, Validators.min(0)],
      completedParts: [this.baseLtg?.completed_parts ?? 0, Validators.min(0)],
      closingComment: this.baseLtg?.closing_comment ?? '',
    });
  }

  private updateLtgFormValues() {
    this.ltgForm.setValue({
      goalTitle: this.baseLtg?.goal_title ?? '',
      description: this.baseLtg?.description ?? '',
      outcome: this.baseLtg?.outcome ?? '',
      obstacles: this.baseLtg?.obstacles ?? '',
      plan: this.baseLtg?.plan ?? '',
      priority: this.baseLtg?.priority ?? null,
      goalType: this.baseLtg?.goal_type ?? null,
      targetDate: this.baseLtg?.target_date
        ? moment(this.baseLtg?.target_date)
        : moment(),
      totalParts: this.baseLtg?.total_parts ?? 0,
      completedParts: this.baseLtg?.completed_parts ?? 0,
      closingComment: this.baseLtg?.closing_comment ?? '',
    });
  }
}
