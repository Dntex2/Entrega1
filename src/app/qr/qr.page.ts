import { Component } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage  {
  result: string = '';
  isScanning: boolean = false;

  constructor() {}

  async scan(): Promise<void> {
    this.isScanning = true; // Activa la vista de la cámara
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;
    this.isScanning = false; // Desactiva la vista de la cámara al terminar
  }
}
