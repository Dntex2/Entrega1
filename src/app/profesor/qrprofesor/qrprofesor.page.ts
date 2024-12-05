import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { QrService } from 'src/app/servicios/qr.service'; // Ruta al servicio QR
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-qrprofesor',
  templateUrl: './qrprofesor.page.html',
  styleUrls: ['./qrprofesor.page.scss'],
})
export class QrprofesorPage {
  objetoJson = false;
  JsonData: any;
  students: any[] = [];

  constructor(
    public qr: QrService,
    private db: DatabaseService,
    private navCtrl: NavController // Añade NavController al constructor
  ) {}

  ngOnInit() {
    this.db.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  async Scaneo() {
    this.objetoJson = false;
    this.JsonData = undefined;

    try {
      await this.qr.StartScan(); // Inicia el escaneo
      const parseResult = JSON.parse(this.qr.scanResult); // Convierte el resultado a JSON

      if (parseResult.exists) {
        this.objetoJson = true;
        this.JsonData = parseResult.data;

        const data = {
          nombre: parseResult.data.nombre,
          rut: parseResult.data.rut,
          gmail: parseResult.data.gmail,
          semestre: parseResult.data.semestre,
          presente: false, // Inicialización predeterminada
          materia: null, // Inicialización predeterminada
        };

        await this.db.addStudent(data); // Guarda en la base de datos
        alert('Datos registrados correctamente.');
      } else {
        alert('El código QR no contiene datos válidos.');
      }
    } catch (e) {
      console.error('Error al escanear:', e);
      alert('Ocurrió un error durante el escaneo.');
    }
  }

  Flashlight() {
    this.qr.flash(); // Activa o desactiva el flash
  }

  // Método para redirigir a la página de agregar estudiantes
  goToAddStudent() {
    this.navCtrl.navigateForward('/add-student'); // Asegúrate de que esta ruta sea válida
  }
}
