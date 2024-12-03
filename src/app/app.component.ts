import { Component, ElementRef, model, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Student } from './models/student.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  @ViewChild('modalId') modal : ElementRef | undefined /** element ref is add #modalId to localize the element  */
  studentObj: Student = new Student()

  closeModal() {
    if (this.modal) {
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
    if (isLocalPresent) {
      const oldStudent: Student [] = JSON.parse(isLocalPresent)
      let name = this.studentObj.name
      let email = this.studentObj.email
      let findStudent = oldStudent.filter(student =>(student.name == name && student.email == email))
      if (!findStudent) {
        oldStudent.push(this.studentObj)
        localStorage.setItem('angularCrud',JSON.stringify(oldStudent))
      } else {
        alert("Student already exist")
      }
    } else {
      const newStudent = []
      newStudent.push(this.studentObj)
      localStorage.setItem('angularCrud',JSON.stringify(newStudent))
    }
  }
  title = 'Angular_crud';
}
