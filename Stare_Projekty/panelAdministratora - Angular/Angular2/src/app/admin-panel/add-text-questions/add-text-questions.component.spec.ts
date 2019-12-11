import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTextQuestionsComponent } from './add-text-questions.component';

describe('AddTextQuestionsComponent', () => {
  let component: AddTextQuestionsComponent;
  let fixture: ComponentFixture<AddTextQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTextQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTextQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
