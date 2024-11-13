import { Component } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage {
  result: string = '';
  isScanning: boolean = false;

  constructor() {}
}
