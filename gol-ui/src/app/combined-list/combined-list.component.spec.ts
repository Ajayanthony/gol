import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedListComponent } from './combined-list.component';

describe('CombinedListComponent', () => {
  let component: CombinedListComponent;
  let fixture: ComponentFixture<CombinedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
