import { Component } from '@angular/core';
import { QrService } from 'src/app/servicios/qr.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import { AlertController } from '@ionic/angular';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-qrprofesor',
  templateUrl: './qrprofesor.page.html',
  styleUrls: ['./qrprofesor.page.scss'],
})
export class QrprofesorPage {
  isScanning: boolean = false;
  JsonData: Student | null = null;
  scannedStudents: Student[] = [];

  constructor(
    public qr: QrService,
    private db: DatabaseService,
    private alertCtrl: AlertController
  ) {
    this.loadScannedStudents();
  }

  async scanQrCode(): Promise<void> {
    this.isScanning = true;
    this.JsonData = null;
    try {
      await this.qr.StartScan();
      const scanResult = this.qr.scanResult;

      if (scanResult) {
        const parsedResult = JSON.parse(scanResult);
        const student = await this.db.getUserByRut(parsedResult.rut);

        if (student) {
          this.JsonData = student;
          this.updateScannedStudent(student);
        } else {
          this.showAlert('Error', 'Estudiante no encontrado en la base de datos.');
        }
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      this.showAlert('Error', 'No se pudo completar el escaneo.');
    } finally {
      this.isScanning = false;
    }
  }

  async toggleAttendance(): Promise<void> {
    if (this.JsonData) {
      try {
        const newPresenceStatus = !this.JsonData.presente;
        await this.db.updatePresence('students', this.JsonData.id!, newPresenceStatus);
        this.JsonData.presente = newPresenceStatus;
        this.updateScannedStudent(this.JsonData);
        alert(`El estudiante ha sido marcado como ${newPresenceStatus ? 'Presente' : 'Ausente'}.`);
      } catch (error) {
        console.error('Error al actualizar la asistencia:', error);
        alert('Error al actualizar la asistencia.');
      }
    }
  }

  updateScannedStudent(student: Student): void {
    const index = this.scannedStudents.findIndex((s) => s.rut === student.rut);
    if (index !== -1) {
      this.scannedStudents[index] = student;
    } else {
      this.scannedStudents.push(student);
    }
    this.saveScannedStudents();
  }

  loadScannedStudents(): void {
    const storedData = localStorage.getItem('scannedStudents');
    if (storedData) {
      this.scannedStudents = JSON.parse(storedData);
    }
  }

  saveScannedStudents(): void {
    localStorage.setItem('scannedStudents', JSON.stringify(this.scannedStudents));
  }

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
