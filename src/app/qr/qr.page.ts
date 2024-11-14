import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage {
  scannedData: string | null = null; // Declaración de la propiedad scannedData

  constructor(private barcodeScanner: BarcodeScanner) {}

  scanQRCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('QR Code Data', barcodeData);
      this.scannedData = barcodeData.text; // Guarda el texto escaneado
    }).catch(err => {
      console.error('Error', err);
    });
  }
}
