import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage {
  constructor(
    private alertController: AlertController, 
    private navCtrl: NavController
  ) {}

  // Muestra una alerta de bienvenida
  async presentWelcomeAlert() {
    const storedUsername = localStorage.getItem('username');
    const alert = await this.alertController.create({
      header: `¡Bienvenido, ${storedUsername}!`,
      message: 'Gracias por usar nuestra aplicación!',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Ejecuta la alerta de bienvenida cuando la vista se carga
  ionViewDidEnter() {
    this.presentWelcomeAlert();
  }

  // Navega a la página del clima
  irAWeather() {
    this.navCtrl.navigateForward('/weather');
  }

  // Navega a la página de asistencias
  openAttendancePage() {
    this.navCtrl.navigateForward('/attendance');
  }
}
