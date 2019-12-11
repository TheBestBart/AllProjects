import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'add-text-questions',
  template: `

  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModaLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModal"><b>Formularz Tworzenia Pyatń</b></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
          <div>
            <div class="form-row">
              <div class="form-group col shadow-textarea">
                <label for="exampleFormControlTextarea6"></label>
                <textarea  [(ngModel)]="question.value" class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
              </div>
              <div class="form-group col">
                <label for="inputCity">typ</label>
                <input type="text" [(ngModel)]="question.type" class="form-control" id="inputCity" placeholder="Stopień">
              </div>
          </div>
          <button type="submit" class="btn btn-primary" (click)="clearQuestionValue()">Wyczyść</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary"  data-dismiss="modal" (click)="create(question)">Wprowadź</button>
      </div>
    </div>
  </div>
</div>
    
  `,
  styles: []
})
export class AddTextQuestionsComponent implements OnInit {

@Input()
title;
@Input()
formButton;

@Input()
question ;


@Output('created')
onCreate = new EventEmitter();

  defaultQuestion = {
    value:"",
    type:""
  };


  clearQuestionValue(){
    this.question = this.defaultQuestion;
  }
  create(question){
    this.onCreate.emit(question); 
  };
  
  constructor() { }

  ngOnInit() {
  }

}
