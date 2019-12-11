import { Component, OnInit } from '@angular/core';
import { isUndefined } from 'util';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from '@firebase/util';

import {StudentService} from './shared/student.service';


@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  providers:[StudentService],
  styles: [`
  
  .fonts{
    font-size: 20px;
  }
  .quest-frame{
    border:3px solid transparent;
    border-color:lightblue;
  }
  .images-style{

  background-color:lightgray;
  filter: grayscale(100%);
  transition: all 0.5s ease;

  }
  .images-style:hover{
    transform: rotate(20deg);
    filter:blur(0px);
  }
  .article-style{
    text-align: justify;
    background-color:black;
    margin: auto;
    padding-bottom:30px!important;
    padding-top:30px;
    font-size:20px;
    border-top:2px solid transparent;
    border-bottom:2px solid transparent;
    border-color:white;
  }
  footer{
    min-height:40px;
  }
  .socials{
  }
  .facebook{
    background-color:#3b5998;
  }
  .linkedIn{
    background-color:#0077B5;
  }
  .stack-overflow{
    background-color:#bcbbbb;
  }
  .git{
    background-color:#bd2c00;
  }
  header{
    font-size:30px;
  }
  i{
    line-height:100px; 
    font-size:30px;
    width:auto;
  }
  .margin{
    margin:0;
    margin:auto;
    padding:0;
    padding:auto;
  }
  `]
})
export class AdminPanelComponent implements OnInit {


  ngOnInit() {
    this.StudentService.getData();
    }

  students;
  
  option="none";
  mode="none";
  
// tablica testow
  selectedTest = null;
  testMode = "none";
  tests = [
    {
      name : 'Kolokwium 1',
      quest : 12,
      color:'#00FFFF',
      questions:[
      ],
      level:'łatwy'
    },
    {
      name : 'Kolokwium 2',
      quest : 12,
      questions:[

        {
          value:"Co to są typy proste i referencyjne? ",
          type:"Text"
        },
        {
          value:"Co to jest Autoboxing and Unboxing? ",
          type : 'text',
        },
       
        {
          value:"Co to są obiekty immutable? ",
          type : 'text',
         
        },
       
        {
          value:"Co to jest serializacja? ",
          type : 'text',
        },

      ],
      color:'#00FFFF',
      level:'średni'
    },
    {
      name : 'Sesja - 1 termin',
      quest : 12,
      questions:[

        {
          value:"Co to jest serializacja0? ",
          type:'Text'
        },
        {
          value:"Co to jest serializacja1? ",
          type:'Text'
        },
       
        {
          value:"Co to jest serializacja2? ",
          type:'Text'
        },
       
        {
          value:"Co to jest serializacja3? ",
          type:'Text'
        },

      ],
      color:'#00FFFF',
      level:'trudny'
    }
  ]


  //tablica pytan

  selectedQuestion = null;
  questionMode = "none";

  questions = [
    {
      value:"Co to jest serializacja0? ",
      type:'Text'
    },
    {
      value:"Co to jest serializacja1? ",
      type:'Text'
    },
   
    {
      value:"Co to jest serializacja2? ",
      type:'Text'
    },
   
    {
      value:"Co to jest serializacja3? ",
      type:'Text'
    },
  ]


  // zmienne dla Studenta
  selectedStudent = null;
  studentMode = "none";

  // students=[
  //   {
  //     name:"Bartek",
  //     lastName:"Łebek",
  //     study:"Informatyka",
  //     year:1,
  //     degree: 2,
  //     age:24,
  //   },
  //   {
  //     name:"Jakub",
  //     lastName:"Łebek",
  //     study:"Informatyka",
  //     year:1,
  //     degree: 2,
  //     age:24
  //   },
  //   {
  //     name:"Maria",
  //     lastName:"Łebek",
  //     study:"Logopedia",
  //     year:3,
  //     degree: 1,
  //     age:22
  //   },
  //   {
  //     name:"Bibiana",
  //     lastName:"Łebek",
  //     study:"Psychologia",
  //     year:3,
  //     degree: 1,
  //     age:23
  //   }
  // ]



  // funkcje Ankiet (testow);

  selectTest(test){
    if(this.selectedTest === null){
      this.selectedTest = this.tests[0];
    }
    this.mode ="selected";
    this.selectedTest = test;
  }
  setTestMode(option){
    this.testMode = option;   
  }


  // funkcje studentów
  selectStudent(student){
    this.mode ="selected";
    this.selectedStudent = student;
  }
  setStudentMode(option){
    this.studentMode = option;
  }

  addStudent(student){
    this.students.push(student);
  }
  deleteStudent(student){
    if(this.selectedStudent!==isUndefined || this.selectedStudent!==null && this.studentMode==='delete')
      for(var i = 0;i<this.students.length;i++){
          if(this.students[i] === student){
            this.students.splice(i,1);
          }
      }
  }

  // funkcje pytań


  selectQuestion(question){
    this.mode ="selected";
    this.selectedQuestion = question;
  }
  setQuestionMode(option){
    this.questionMode = option;  
  }

  addQuestion(question){
    this.questions.push(question);
  }
  
  deleteQuestion(question){
    if(this.selectedQuestion!==isUndefined || this.selectedQuestion!==null && this.questionMode==='delete')
      for(var i = 0;i<this.questions.length;i++){
          if(this.questions[i] === question){
            this.questions.splice(i,1);
          }
      }
  }
  // funkcje ogolne

  
  setOption(option){
    if(this.selectedTest === null){
      this.selectedTest = this.tests[0];
    }
    if(this.selectedStudent===isUndefined || this.selectedStudent===null){
      this.selectedStudent = {
        name:"",
        lastName:"",
        study:"",
        year:0,
        degree: 0,
        age:0
      }; 
      if(this.selectedQuestion===isUndefined || this.selectedQuestion===null){
        this.selectedQuestion = {
          value:"",
          type:""
        }; 
      }

      console.log(this.students);
      this.StudentService.updateStudent(this.students[0]);
    }
    this.testMode = null;
    this.option = option;
  }

  imagesPaths : string[];
  

  //funckje i zmienne bazy danych

  

  constructor(private db : AngularFireDatabase, private StudentService : StudentService) {
      this.imagesPaths = ['/assets/images/students.png','/assets/images/icon-ankieta.png','/assets/images/question.png', '/assets/images/Groups.png'];
      this.StudentService.getData().valueChanges().subscribe(students=>{
        this.students = students;
        console.log(this.students);
     });
     
   }

  addStudentToFirebase(data:any , collectionName:string):void{
   this.StudentService.addStudent(data,collectionName);
 }
  updateInFirebase(db:AngularFireDatabase, data:any, str:string):void{
  };

}
