import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-array';

  students: Student[] = [
    new Student("John", 20, "Computer Science", 85),
    new Student("Emily", 21, "Electrical Engineering", 78),
    new Student("David", 19, "Mechanical Engineering", 92),
    new Student("Sophia", 22, "Chemistry", 75)
  ];


  selectedField: string = 'name';
  searchTerm: string = '';
  minMarks: number = 0;

  sortStudents() {
    this.students.sort((a, b) => {
      if (a[this.selectedField] < b[this.selectedField]) {
        return -1;
      }
      if (a[this.selectedField] > b[this.selectedField]) {
        return 1;
      }
      return 0;
    });
  }


  filterStudents() {
    this.students = this.students.filter(student => {
      const searchString = this.searchTerm.toLowerCase();
      return student.name.toLowerCase().includes(searchString) ||
             student.department.toLowerCase().includes(searchString);
    });
  }

  filterStudentsByMarks() {
    if (!this.minMarks) {
      // If minMarks is not provided, reset students array to original state
      this.resetStudents();
      return;
    }

    this.students = this.students.filter(student => student.totalMarks > this.minMarks);
  }
  resetStudents() {
    // Reset students array to original state
    this.students = [
      new Student("John", 20, "Computer Science", 85),
      new Student("Emily", 21, "Electrical Engineering", 78),
      new Student("David", 19, "Mechanical Engineering", 92),
      new Student("Sophia", 22, "Chemistry", 75)
    ];
  }

}
class Student {
  [key: string]: any;
  constructor(
    public name: string,
    public age: number,
    public department: string,
    public totalMarks: number
  ) {}
}