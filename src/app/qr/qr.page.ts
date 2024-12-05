import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { DatabaseService } from '../servicios/database.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {
  qrCodeImage: string = '';
  user: Student | null = null;
  isPresent: boolean = false;

  constructor(private db: DatabaseService) {}

  async ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.rut) {
        this.db.listenToStudentPresence(parsedUser.rut).subscribe(
          (student: Student | null) => {
            if (student) {
              this.user = student;
              this.isPresent = student.presente;
              this.generateQRCode(JSON.stringify(student));
            }
          },
          (error: any) => {
            console.error('Error al escuchar cambios en presencia:', error);
          }
        );
      }
    }
  }

  async generateQRCode(data: string): Promise<void> {
    try {
      this.qrCodeImage = await QRCode.toDataURL(data);
    } catch (error) {
      console.error('Error al generar el código QR:', error);
    }
  }
}
