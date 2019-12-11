import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'content-card',
  template: `
       <div class="row">
          <ng-content></ng-content>
       </div>
  `,
  styles: []
})
export class ContentCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
