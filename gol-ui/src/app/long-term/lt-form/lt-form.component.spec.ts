import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtFormComponent } from './lt-form.component';

describe('LtFormComponent', () => {
  let component: LtFormComponent;
  let fixture: ComponentFixture<LtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
