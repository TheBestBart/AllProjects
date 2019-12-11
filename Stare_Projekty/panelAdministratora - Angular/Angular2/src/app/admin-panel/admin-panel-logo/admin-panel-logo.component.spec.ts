import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelLogoComponent } from './admin-panel-logo.component';

describe('AdminPanelLogoComponent', () => {
  let component: AdminPanelLogoComponent;
  let fixture: ComponentFixture<AdminPanelLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
