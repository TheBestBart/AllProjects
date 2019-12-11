import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextQuestionsListComponent } from './text-questions-list.component';

describe('TextQuestionsListComponent', () => {
  let component: TextQuestionsListComponent;
  let fixture: ComponentFixture<TextQuestionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextQuestionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextQuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
