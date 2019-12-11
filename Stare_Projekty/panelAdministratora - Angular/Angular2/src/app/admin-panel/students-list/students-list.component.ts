import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'students-list',
  template: `
  <div class="col">
  <table class="table table-striped table-dark">
      <thead>
          <tr>
              <th> # </th>
              <th> Student </th>
              <th> Wiek </th>
              <th> Kierunek </th>
              <th> Rok </th>
              <th> Stopień</th>
          </tr>
      </thead>
      <tbody>
          <tr *ngFor="let student of students; let i = index"
          class="student-row" 
          [ngClass]="{'student-row table-active': selectedStudent == student}"
          (click)="selectStudent(student)" (click)="selectStudentMode('none')">
              <td> {{ i + 1 }} </td>
              <td> <b>{{student.firstName + " " + student.lastName}}</b></td>
              <td> <b>{{student.age}}</b></td>
              <td> <b>{{student.study}}</b></td>
              <td> <b>{{student.year}}</b></td>
              <td> <b>{{student.degree}}</b></td>
          </tr>
      </tbody>
  </table>
  <button type="button" class="btn btn-outline-danger float-right" (click)="selectStudentMode('delete')" (click)="deleteStudent(selectedStudent)">Usuń</button>
  <button type="button" class="btn btn-outline-primary float-right" data-toggle="modal" data-target="#exampleModal"  (click)="selectStudentMode('add')">Dodaj</button>
  <button type="button" class="btn btn-outline-secondary float-right" data-toggle="modal" data-target="#exampleModal"  (click)="selectStudentMode('edit')">Edytuj</button>
</div>
<div [ngSwitch]="studentMode">
  <add-student *ngSwitchCase="'add'" (created)="created($event)" [student]="defaultStudent"></add-student>
  <add-student *ngSwitchCase="'edit'" [student]="selectedStudent"></add-student >
</div>



  `,
  styles: [
  `.student-row{
    border: 3px solid transparent;
    color:lightgreen!important;
    border-color:lightgreen!important;
  }
  `]
})
export class StudentsListComponent implements OnInit {
  defaultStudent = {
    firstName:"",
    lastName:"",
    study:"",
    year:0,
    degree: 0,
    age:0
  };
  title = ["dodawania","edycji"];
  formButton = ['dodaj','edytuj'];

  @Input()
  students;
  @Input()
  selectedStudent;
  
  @Output('selectedStudent')
  onSelectedStudent = new EventEmitter();
  @Output('selectedStudentMode')
  onSelectedStudentMode = new EventEmitter();
  @Output('studentMode')
  studentMode;
  @Output('addedStudent')
  onAddStudent = new EventEmitter();
  @Output('deletedStudent')
  onDeleteStudent = new EventEmitter();

  // createdStudent = null; 

  created(student){
    // this.createdStudent = student;
    this.onAddStudent.emit(student); 
  }
  selectStudent(student){
    this.selectedStudent = student;
    this.onSelectedStudent.emit(student); 
  }
  selectStudentMode(mode){
    this.studentMode = mode;
    this.onSelectedStudentMode.emit(mode);
  }
  deleteStudent(student){
  this.onDeleteStudent.emit(student);
  }
 
  constructor() { }

  ngOnInit() {
  }

}
