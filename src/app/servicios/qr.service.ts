import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  scan: boolean = false;
  scanResult: string = '';
  flashOn: boolean = false;

  constructor() {}

  async CheckPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      return status.granted;
    } catch (e) {
      console.error('Error checking permissions:', e);
      return false;
    }
  }

  async StartScan() {
    if (!this.scan) {
      this.scan = true;
      try {
        const permission = await this.CheckPermission();
        if (!permission) {
          alert('No hay permisos de cámara.');
          this.scan = false;
          return;
        }
        await BarcodeScanner.hideBackground();
        document.body.classList.add('scanner-active');
        const result = await BarcodeScanner.startScan();
        BarcodeScanner.showBackground();
        document.body.classList.remove('scanner-active');
        this.scan = false;

        if (result?.hasContent) {
          this.scanResult = result.content;
        }
      } catch (e) {
        console.error('Error durante el escaneo:', e);
        this.scan = false;
      }
    } else {
      this.StopScan();
    }
  }

  StopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.body.classList.remove('scanner-active');
    this.scan = false;
    this.scanResult = '';
  }

  flash() {
    if (this.flashOn) {
      BarcodeScanner.disableTorch();
      this.flashOn = false;
    } else {
      BarcodeScanner.enableTorch();
      this.flashOn = true;
    }
  }
}
