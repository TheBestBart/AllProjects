import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'text-questions-list',
  template: `

  <div class="col">
      <table class="table table-striped table-dark">
          <thead>
              <tr>
                  <th> # </th>
                  <th> Pytanie</th>
                  <th> Typ </th>
              </tr>
          </thead>
          <tbody>
              <tr *ngFor="let question of questions; let i = index"
              class="question-row" 
              [ngClass]="{'question-row table-active': selectedQuestion == question}"
              (click)="selectQuestion(question)">
                  <td> {{ i + 1 }} </td>
                  <td> <b>{{question.value}}</b></td>
                  <td> <b>{{question.type}}</b></td>
              </tr>
          </tbody>
      </table>
      <button type="button" class="btn btn-outline-danger float-right" (click)="selectQuestionMode('delete')" (click)="deleteQuestion(selectedQuestion)">Usuń</button>
  <button type="button" class="btn btn-outline-primary float-right" data-toggle="modal" data-target="#exampleModal"  (click)="selectQuestionMode('add')">Dodaj</button>
  <button type="button" class="btn btn-outline-secondary float-right" data-toggle="modal" data-target="#exampleModal"  (click)="selectQuestionMode('edit')">Edytuj</button>
    </div>

    <div [ngSwitch]="questionMode">
      <add-text-questions *ngSwitchCase="'add'" (created)="created($event)" [question]="defaultQuestion"></add-text-questions>
      <add-text-questions *ngSwitchCase="'edit'" [question]="selectedQuestion"></add-text-questions>
    </div>
    
  `,
  styles: [
    `
    .question-row{
      border: 3px solid transparent;
      color:lightgreen!important;
      border-color:lightgreen!important;
    }

    `
  ]
})
export class TextQuestionsListComponent implements OnInit {
    defaultQuestion = {
      value:"",
      type:""
    };

  title = ["dodawania","edycji"];
  formButton = ['dodaj','edytuj'];

  @Input()
  questions;
  @Input()
  selectedQuestion;
  
  @Output('selectedQuestion')
  onSelectedQuestion = new EventEmitter();
  @Output('selectedQuestionMode')
  onSelectedQuestionMode = new EventEmitter();
  @Output('questionMode')
  questionMode;
  @Output('addedQuestion')
  onAddQuestion = new EventEmitter();
  @Output('deletedQuestion')
  onDeleteQuestion = new EventEmitter();

 

  created(question){
    this.onAddQuestion.emit(question); 
  }
  selectQuestion(question){
    this.questionMode = "none";
    this.selectedQuestion = question;
    this.onSelectedQuestion.emit(question); 
  }
  selectQuestionMode(mode){
    this.questionMode = mode;
    this.onSelectedQuestionMode.emit(mode);
  }
  deleteQuestion(question){
  this.onDeleteQuestion.emit(question);
  }
  constructor() { }

  ngOnInit() {
  }

}
