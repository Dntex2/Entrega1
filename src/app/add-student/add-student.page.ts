import { Component } from '@angular/core';
import { DatabaseService } from '../servicios/database.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage {
  student = {
    nombre: '', // Campo para el nombre del estudiante
    rut: '',    // Campo para el RUT del estudiante
    gmail: '',  // Campo para el correo electrónico
    semestre: null, // Campo para el semestre del estudiante
  };

  constructor(private db: DatabaseService, private navCtrl: NavController) {}

  async submitForm() {
    try {
      // Llamar al servicio de base de datos para agregar el estudiante
      await this.db.addStudent(this.student);
      alert('Estudiante agregado correctamente.');
      this.navCtrl.navigateBack('/profesor/qrprofesor'); // Redirige de vuelta a la página QR
    } catch (error) {
      console.error('Error al agregar el estudiante:', error);
      alert('Ocurrió un error al agregar el estudiante.');
    }
  }
}
