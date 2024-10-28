import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage {
  constructor(private alertController: AlertController, private navCtrl: NavController ) {}

  async presentWelcomeAlert() {
    const storedUsername = localStorage.getItem('username');
    const alert = await this.alertController.create({
      header: `¡Bienvenido, ${storedUsername}!`,
      message: 'Gracias por usar nuestra aplicacion!.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.presentWelcomeAlert();
  }

  irAWeather() {
    this.navCtrl.navigateForward('/weather'); // Navega a la página del clima
  }
}
