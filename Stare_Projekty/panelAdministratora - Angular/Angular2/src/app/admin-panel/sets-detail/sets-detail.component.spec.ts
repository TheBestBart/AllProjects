import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsDetailComponent } from './sets-detail.component';

describe('SetsDetailComponent', () => {
  let component: SetsDetailComponent;
  let fixture: ComponentFixture<SetsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
