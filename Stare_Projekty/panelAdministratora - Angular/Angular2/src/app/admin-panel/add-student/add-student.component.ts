import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';


@Component({
  selector: 'add-student',
  template: `
    
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModaLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModal"><b>Formularz Studenta</b></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
          <div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Imie</label>
                <input type="text" [(ngModel)]="student.name" class="form-control" id="inputEmail4" placeholder="Imie">
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Nazwisko</label>
                <input type="text" [(ngModel)]="student.lastName" class="form-control" id="inputPassword4" placeholder="Nazwisko">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col">
                <label for="inputCity">Kierunek</label>
                <input type="text" [(ngModel)]="student.study" class="form-control" id="inputCity" placeholder="Kierunek">
              </div>
              <div class="form-group col">
                <label for="inputCity">Rok</label>
                <input type="text"[(ngModel)]="student.year"  class="form-control" id="inputCity" placeholder="Rok">
              </div>
              <div class="form-group col">
                <label for="inputCity">Stopień</label>
                <input type="text" [(ngModel)]="student.degree" class="form-control" id="inputCity" placeholder="Stopień">
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">Wiek</label>
                <input type="text" [(ngModel)]="student.age" class="form-control" id="inputZip">
              </div>
            </div>
            <button type="submit" class="btn btn-primary" (click)="clearStudentValue()">Wyczyść</button>
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="create(student)">Wprowadź</button>
      </div>
    </div>
  </div>
</div>
  `,
  styles: []
})
export class AddStudentComponent implements OnInit {
@Input()
title;
@Input()
formButton;

@Input()
student ;


@Output('created')
onCreate = new EventEmitter();

  defaultStudent = {
    firstName:"",
    lastName:"",
    study:"",
    year:0,
    degree: 0,
    age:0
  };

  clearStudentValue(){
    this.student = this.defaultStudent;
  }
  create(student){
    this.onCreate.emit(student); 
  };
  
  constructor() { }

  ngOnInit() {
  }

}
