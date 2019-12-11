import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'nav-bar',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark nav-style">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link"><button type="button" class="btn btn-primary navbar-brand text-white" (click)="setOption('questions')">Pytania</button></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><button type="button" class="btn btn-outline-primary navbar-brand text-white" (click)="setOption('students')">Studenci</button></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><button type="button" class="btn btn-outline-primary navbar-brand text-white Ankiety" (click)="setOption('sets')">Ankiety</button></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
</nav>
<br><br>
  `,
  styles: [`
  .nav-style{
    border-bottom:2px solid transparent;
    border-color:white;
    padding-top:20px;
    padding-bottom:20px;
    background-color:rgba(0, 0, 0, 0.7)!important;
  }
  `]
})
export class NavBarComponent implements OnInit {

  @Output('option')
  emitter = new EventEmitter();

  setOption(option){
    this.emitter.emit(option);
  }
  constructor() { }

  ngOnInit() {
  }

}
