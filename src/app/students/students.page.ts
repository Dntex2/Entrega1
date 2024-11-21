import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../servicios/database.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  students: any[] = []; // Almacena la lista de estudiantes

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db.getStudents().subscribe(data => {
      this.students = data; // Actualiza la lista en tiempo real
    });
  }
}
