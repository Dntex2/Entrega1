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
    name: '',
    email: '',
    age: null,
    grade: '',
  };

  constructor(private db: DatabaseService, private navCtrl: NavController) {}

  async submitForm() {
    try {
      await this.db.addStudent(this.student);
      alert('Estudiante agregado correctamente.');
      this.navCtrl.navigateBack('/qr'); // Redirige de vuelta a la página QR
    } catch (error) {
      console.error('Error al agregar el estudiante:', error);
      alert('Ocurrió un error al agregar el estudiante.');
    }
  }
}
