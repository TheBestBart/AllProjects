import { Injectable } from '@angular/core';
import { Student } from './student.model';
import {AngularFireDatabase, AngularFireList,} from 'angularfire2/database'

@Injectable()
export class StudentService {

  studentList : AngularFireList<any>;
  selectedStudent : Student = new Student();

  constructor(private firebase : AngularFireDatabase) { }

  getData(){
    this.studentList = this.firebase.list('Students');
    return this.studentList;
  }
  
  insertStudent(student:Student){
    this.studentList.push({
      $key : student.$key,
      firstName : student.firstName,
      lastName : student.lastName,
      study : student.study,
      year : student.year,
      degree: student.degree,
      age : student.age
    });
  }

  addStudent(student:Student, collectionName:string):void{
    this.firebase.list(collectionName).push(student);
  }

  updateStudent(student:Student){
    // this.studentList.update(student.$key,{});
    console.log(student.$key);
  }

}
