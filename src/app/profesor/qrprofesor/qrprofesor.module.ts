import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrprofesorPageRoutingModule } from './qrprofesor-routing.module';

import { QrprofesorPage } from './qrprofesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrprofesorPageRoutingModule
  ],
  declarations: [QrprofesorPage]
})
export class QrprofesorPageModule {}
