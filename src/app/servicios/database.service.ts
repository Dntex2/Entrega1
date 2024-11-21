import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto asegura que el servicio esté disponible en toda la aplicación.
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  // 1. Método para agregar un estudiante
  addStudent(student: any): Promise<void> {
    const id = this.firestore.createId(); // Genera un ID único automáticamente
    return this.firestore.collection('students').doc(id).set({ ...student, id });
  }

  // 2. Método para obtener la lista de estudiantes
  getStudents(): Observable<any[]> {
    return this.firestore.collection('students').valueChanges();
  }
}
