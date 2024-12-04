import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Student } from './models/student.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild('modalId') modal : ElementRef | undefined /** element ref is add #modalId to localize the element  */
  studentObj: Student = new Student()
  studentList: Student[] = []

  ngOnInit(): void {
    this.getStudent()
  }

  genRand = (len:any) => {
    return Math.random().toString(36).substring(2,len+2);
  }

  closeModal() {
    if (this.modal) {
      this.studentObj = new Student()
      this.modal.nativeElement.style.display = 'none'
    }
  }

  openModal() {
    const modal =  document.getElementById('modalId')
    if (modal) {
      modal.style.display = 'block'
    }
  }

  saveStudent() {
    const isLocalPresent = localStorage.getItem("angularCrud")
    if (isLocalPresent != null) {

      const oldStudent: Student [] = JSON.parse(isLocalPresent)
      let name = this.studentObj.name
      let email = this.studentObj.email
      let id = this.studentObj.id
      let findStudent: Student[]
      if (id !== '') {
        findStudent = oldStudent.filter(student =>(student.id !== id ))
        findStudent.push(this.studentObj)
        localStorage.setItem('angularCrud',JSON.stringify(findStudent))
        this.closeModal()
      } else {
        this.studentObj.id = this.genRand(10)
        findStudent = oldStudent.filter(student =>(student.name == name && student.email == email))
        if ( Object.keys(findStudent).length == 0) {
          oldStudent.push(this.studentObj)
          localStorage.setItem('angularCrud',JSON.stringify(oldStudent))
          this.closeModal()
        } else {
          alert("Student already exist")
        }
      }
    } else {
      const newStudent = []
      this.studentObj.id = this.genRand(10)
      newStudent.push(this.studentObj)
      localStorage.setItem('angularCrud',JSON.stringify(newStudent))
      this.closeModal()
    }

    this.getStudent()
  }

  getStudent(){
    const localData = localStorage.getItem("angularCrud")
    if (localData != null) {
      this.studentList = JSON.parse(localData)
    }
    return this.studentList
  }

  editStudent(student: Student) {
    this.studentObj = student
    this.openModal()
  }

  delStudent(id:any){
    const isLocalPresent = localStorage.getItem("angularCrud")
    if (isLocalPresent != null) {
      let allStudent: Student [] = JSON.parse(isLocalPresent)
      let otherStudent = allStudent.filter(student =>(student.id != id))
      localStorage.setItem('angularCrud',JSON.stringify(otherStudent))
    }

    this.getStudent()
  }
  title = 'Angular_crud';
}

