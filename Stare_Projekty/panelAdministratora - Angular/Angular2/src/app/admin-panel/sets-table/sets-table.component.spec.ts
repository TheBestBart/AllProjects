import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsTableComponent } from './sets-table.component';

describe('SetsTableComponent', () => {
  let component: SetsTableComponent;
  let fixture: ComponentFixture<SetsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
