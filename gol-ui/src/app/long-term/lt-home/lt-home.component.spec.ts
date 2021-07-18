import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtHomeComponent } from './lt-home.component';

describe('LtHomeComponent', () => {
  let component: LtHomeComponent;
  let fixture: ComponentFixture<LtHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
