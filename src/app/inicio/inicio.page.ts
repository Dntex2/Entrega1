import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage {
  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {}

  // Muestra la pantalla de carga al entrar en la vista
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 100,
    });
    await loading.present();
  }

  // Muestra una alerta de bienvenida
  async presentWelcomeAlert() {
    const storedUser = localStorage.getItem('user'); 
    let username = 'Usuario';

    if (storedUser) {
      const user = JSON.parse(storedUser); 
      username = user.username; 
    }

    const alert = await this.alertController.create({
      header: `¡Bienvenido, ${username}!`,
      message: 'Gracias por usar nuestra aplicación!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Ejecuta la alerta de bienvenida cuando la vista se carga
  ionViewDidEnter() {
    this.presentLoading();
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
