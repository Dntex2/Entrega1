import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFire
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importa Firestore
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importa Firebase Auth
import { environment } from '../environments/environment'; // Asegúrate de apuntar al archivo correcto de configuraciones

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase
    AngularFirestoreModule, // Habilita Firestore
    AngularFireAuthModule, // Habilita Auth si es necesario
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
