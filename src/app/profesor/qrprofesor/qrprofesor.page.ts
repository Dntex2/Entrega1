import { Component, OnInit } from '@angular/core';
import { QRCodeService } from '../servicios/qrcode.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-qrprofesor',
  templateUrl: './qrprofesor.page.html',
  styleUrls: ['./qrprofesor.page.scss'],
})
export class QrprofesorPage implements OnInit {
  qrCodeImage: string | null = null;
  student: any = {
    nombre: 'Juan Pérez',  // Reemplaza con los datos reales
    rut: '',
    asignatura: '',
  };
  isPresent: boolean = false;

  constructor(private qrService: QRCodeService, private router: Router) {}

  ngOnInit() {
    this.generateQRCode();
  }

  // Método para generar el QR
  generateQRCode() {
    const qrData = {
      nombre: this.student.nombre,
      rut: this.student.rut,
      asignatura: this.student.asignatura,
    };
    
    this.qrCodeImage = this.qrService.generateQRCode(qrData);
  }

  // Método para manejar el escaneo del QR (simulado)
  onScanQRCode(scannedData: any) {
    // Lógica para validar el escaneo del QR
    if (scannedData.nombre === this.student.nombre && scannedData.rut === this.student.rut && scannedData.asignatura === this.student.asignatura) {
      this.isPresent = true; // El estudiante está presente
    } else {
      this.isPresent = false; // El estudiante no está presente
    }
  }

  // Método para navegar hacia la página de inicio
  goBack() {
    this.router.navigate(['/profesor/inicio']);
  }
}
