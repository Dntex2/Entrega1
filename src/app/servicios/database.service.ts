import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'; // Importa el operador map
import { Observable } from 'rxjs';
import { Student } from '../models/student.model'; // Importa el modelo Student

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener un estudiante por su RUT desde la colección "students"
  async getUserByRut(rut: string): Promise<any> {
    try {
      const snapshot = await this.firestore
        .collection('students', (ref) => ref.where('rut', '==', rut))
        .get()
        .toPromise();

      if (snapshot && !snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data() as Record<string, any>;
        return { id: doc.id, ...data }; // Devuelve el estudiante con su ID
      } else {
        return null; // Estudiante no encontrado
      }
    } catch (error) {
      console.error('Error al obtener el usuario por RUT:', error);
      throw new Error('Error al consultar la base de datos.');
    }
  }

  // Validar estudiante por RUT y contraseña
  async getUserByRutAndPassword(rut: string, password: string): Promise<any> {
    try {
      const snapshot = await this.firestore
        .collection('students', (ref) =>
          ref.where('rut', '==', rut).where('password', '==', password)
        )
        .get()
        .toPromise();

      if (snapshot && !snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data() as Record<string, any>;
        return { id: doc.id, ...data }; // Devuelve el estudiante con su ID
      } else {
        return null; // Estudiante no encontrado
      }
    } catch (error) {
      console.error('Error al validar estudiante por RUT y contraseña:', error);
      throw error;
    }
  }

  // Obtener un profesor por RUT desde la colección "professors"
  async getProfessorByRut(rut: string): Promise<any> {
    try {
      const snapshot = await this.firestore
        .collection('professors', (ref) => ref.where('rut', '==', rut))
        .get()
        .toPromise();

      if (snapshot && !snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data() as Record<string, any>;
        return { id: doc.id, ...data }; // Devuelve el profesor con su ID
      } else {
        return null; // Profesor no encontrado
      }
    } catch (error) {
      console.error('Error al obtener el profesor por RUT:', error);
      throw new Error('Error al consultar la base de datos.');
    }
  }

  // Validar profesor por RUT y contraseña
  async getProfessorByRutAndPassword(rut: string, password: string): Promise<any> {
    try {
      const snapshot = await this.firestore
        .collection('professors', (ref) =>
          ref.where('rut', '==', rut).where('password', '==', password)
        )
        .get()
        .toPromise();

      if (snapshot && !snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data() as Record<string, any>;
        return { id: doc.id, ...data }; // Devuelve el profesor con su ID
      } else {
        return null; // Profesor no encontrado
      }
    } catch (error) {
      console.error('Error al validar profesor por RUT y contraseña:', error);
      throw error;
    }
  }

  async addStudent(student: any): Promise<void> {
    try {
      await this.firestore.collection('students').add(student);
      console.log('Estudiante agregado:', student);
    } catch (error) {
      console.error('Error al agregar estudiante:', error);
      throw error;
    }
  }
  
  async addProfessor(professor: any): Promise<void> {
    try {
      await this.firestore.collection('professors').add(professor);
      console.log('Profesor agregado:', professor);
    } catch (error) {
      console.error('Error al agregar profesor:', error);
      throw error;
    }
  }
  

  // Obtener todos los estudiantes
  getStudents() {
    return this.firestore.collection('students').valueChanges();
  }

  // Obtener todos los profesores
  getProfessors() {
    return this.firestore.collection('professors').valueChanges();
  }

  // Actualizar la contraseña de un usuario (estudiante o profesor)
  async updatePassword(collection: string, userId: string, newPassword: string): Promise<void> {
    try {
      await this.firestore.collection(collection).doc(userId).update({
        password: newPassword,
      });
      console.log('Contraseña actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw error;
    }
  }

  // Actualizar asistencia de un estudiante
async updateAttendance(userId: string, presente: boolean): Promise<void> {
  try {
    await this.firestore.collection('students').doc(userId).update({
      presente: presente,
    });
    console.log('Asistencia actualizada correctamente.');
  } catch (error) {
    console.error('Error al actualizar asistencia:', error);
    throw error;
  }
}

async updateField(collection: string, id: string, data: any): Promise<void> {
  try {
    await this.firestore.collection(collection).doc(id).update(data);
    console.log('Campo actualizado:', data);
  } catch (error) {
    console.error('Error al actualizar el campo:', error);
    throw error;
  }
}

// Actualizar la asistencia del estudiante
async updateStudentPresence(rut: string, isPresent: boolean): Promise<void> {
  try {
    const snapshot = await this.firestore
      .collection('students', (ref) => ref.where('rut', '==', rut))
      .get()
      .toPromise();

    if (snapshot && !snapshot.empty) {
      const docId = snapshot.docs[0].id;
      await this.firestore.collection('students').doc(docId).update({
        presente: isPresent,
      });
      console.log('Presente actualizado correctamente.');
    } else {
      console.error('Estudiante no encontrado para actualizar presencia.');
    }
  } catch (error) {
    console.error('Error al actualizar la presencia del estudiante:', error);
    throw error;
  }

}

// Actualizar el estado de presencia de un estudiante
async updatePresence(collection: string, userId: string, isPresent: boolean): Promise<void> {
  try {
    await this.firestore.collection(collection).doc(userId).update({
      presente: isPresent,
    });
    console.log(`Presencia actualizada para ${userId}: ${isPresent}`);
  } catch (error) {
    console.error('Error al actualizar la presencia:', error);
    throw error;
  }
}
listenToStudentPresence(rut: string): Observable<Student | null> {
  return this.firestore
    .collection<Student>('students', (ref) => ref.where('rut', '==', rut))
    .valueChanges({ idField: 'id' }) // Incluye el campo `id` en los resultados
    .pipe(
      map((students) => (students.length > 0 ? students[0] : null)) // Devuelve el primer estudiante o null
    );
}
}

