import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sets-detail',
  template: `

  
  <div class="col">
  
  <div class="card bg-secondary text-white">
      <div class="list-group ">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{selectedTest.name}}</h5>
              <small>3 days ago</small>
            </div>
            <p class="mb-1">Poziom trudności: trudny</p>
            <small>ilosc pytań: {{selectedTest.questions.length}}</small>
          </a>
          <a *ngFor="let question of selectedTest.questions; let i = index"
           href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"></h5>
              <small class="text-muted">pytanie nr {{ i+1}}</small>
            </div>
            <p class="mb-1">{{question.value}}</p>
            <small class="text-muted">Poziom trudności: trudny</small>
          </a>
         
        </div>
  </div><br>
  <button class="btn btn-outline-success my-2 my-sm-0 flaot-right" type="submit">Edytuj</button>

</div>
    
  `,
  styles: []
})
export class SetsDetailComponent implements OnInit {
  @Input()
  selectedTest = null;

  constructor() { }

  ngOnInit() {
  }

}
