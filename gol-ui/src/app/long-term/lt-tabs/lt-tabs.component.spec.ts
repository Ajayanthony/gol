import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtTabsComponent } from './lt-tabs.component';

describe('LtTabsComponent', () => {
  let component: LtTabsComponent;
  let fixture: ComponentFixture<LtTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
