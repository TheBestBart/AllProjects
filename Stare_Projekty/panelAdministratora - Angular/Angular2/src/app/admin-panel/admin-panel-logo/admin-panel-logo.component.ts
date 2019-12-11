import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-panel-logo',
  template: `
    <div class="card">
      <div class="card-body text-center textAdmin font-italic logo-border">
        <b>Panel Administratora</b>
      </div>
    </div>
  `,
  styles: [`
  .textAdmin{
    font-size:30px;
    color:white;
    text-shadow:2px 2px 4px #000000;
  }
  .logo-border{
    border: 2px solid transparent;
    border-color:white;
    background-color:rgba(0, 0, 0, 0.5)!important;
  }
  
  `
]
})
export class AdminPanelLogoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
