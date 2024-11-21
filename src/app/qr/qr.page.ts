import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QrService } from '../servicios/qr.service';
import { DatabaseService } from '../servicios/database.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage {
  objetoJson = false;
  JsonData: any;
  students: any[] = [];

  constructor(
    public qr: QrService,
    private db: DatabaseService,
    private navCtrl: NavController // Servicio de navegación
  ) {}

  ngOnInit() {
    // Cargar la lista de estudiantes
    this.db.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  async Scaneo() {
    this.objetoJson = false; // Reinicia el estado
    this.JsonData = undefined;

    try {
      await this.qr.StartScan(); // Inicia el escaneo
      const parseResult = JSON.parse(this.qr.scanResult); // Convierte el resultado a JSON

      if (parseResult.exists) {
        this.objetoJson = true;
        this.JsonData = parseResult.data;

        const student = {
          name: parseResult.data.name,
          email: parseResult.data.email,
          age: parseResult.data.age,
          grade: parseResult.data.grade,
        };

        await this.db.addStudent(student); // Guarda en la base de datos
        alert('Estudiante agregado correctamente.');
      } else {
        alert('El código QR no contiene datos válidos.');
      }
    } catch (e) {
      console.error('Error al escanear:', e);
      alert('Ocurrió un error durante el escaneo.');
    }
  }

  Flashlight() {
    this.qr.flash();
  }

  // Método para redirigir a la página de agregar estudiante
  goToAddStudent() {
    this.navCtrl.navigateForward('/add-student');
  }
}
