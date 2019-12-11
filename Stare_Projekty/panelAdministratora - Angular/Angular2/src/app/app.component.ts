import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database'
// import { Observable } from '@firebase/util';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
  
  .appComponentStyle{
    position:absolute;
    width:100%;
    min-height:100%;
    background-color:rgba(0, 0, 0, 0.6)!important;
    margin:0;
    padding:0;
    margin-bottom:-29px;
  }
  `]
  
})
export class AppComponent implements OnInit{

  student = {

  };
  ngOnInit(){
  }
  constructor(){
  }

  
}
