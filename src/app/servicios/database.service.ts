import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  // Obtiene la lista de estudiantes
  getStudents() {
    return this.firestore.collection('students').valueChanges({ idField: 'id' });
  }

  // Agrega un estudiante a la base de datos
  addStudent(student: any) {
    return this.firestore.collection('students').add(student);
  }
}
