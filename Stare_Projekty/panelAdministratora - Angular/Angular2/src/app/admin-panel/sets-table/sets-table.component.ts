import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';


@Component({
  selector: 'sets-table',
  template: `
      <div class="col">
      <table class="table table-striped table-dark">
          <thead>
              <tr>
                  <th> # </th>
                  <th> Nazwa </th>
                  <th> Pytań </th>
              </tr>
          </thead>
          <tbody>
              <tr *ngFor="let test of tests; let i = index"
              class="test-row" 
              [ngClass]="{'test-row table-active': selectedTest == test}"
              [ngStyle]="{ borderColor: test.color }"
              (click)="selectSets(test)">
                  <td> {{ i + 1 }} </td>
                  <td> <b>{{test.name}}</b></td>
                  <td> {{test.quest}} </td>
              </tr>
          </tbody>
      </table>
      <button type="button" class="btn btn-outline-danger float-right" (click)="selectSetsMode('delete')">Usuń</button>
      <button type="button" class="btn btn-outline-primary float-right" data-toggle="modal" data-target="#exampleModal" (click)="selectSetsMode('add')">Dodaj</button>
      <button type="button" class="btn btn-outline-secondary float-right" (click)="selectSetsMode('edit')">Edytuj</button>
    </div>
  `,
  styles: [
    ` .test-row{
      border: 3px solid transparent;
    }
    .test-row:hover{
      color:lightgreen!important;
      border-color:lightgreen!important;
    }
    `
  ]
})
export class SetsTableComponent implements OnInit {
 
  mode="none";

  @Output('selectedTest')
  onSelectedTest = new EventEmitter();
  @Output('selectedTestMode')
  onSelectedTestMode = new EventEmitter();
  @Output('testMode')
  testMode;

  @Input()
  tests;
  @Input()
  selectedTest;

  selectSets(test){
    this.selectedTest = test;
    this.onSelectedTest.emit(test);  
  }

  selectSetsMode(mode){
    this.onSelectedTestMode.emit(mode); 
  }

  constructor() { }

  ngOnInit() {
  }

}
