import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  professorName: string = ''; // Nombre del profesor

  constructor(private navCtrl: NavController) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.isProfessor) {
        this.professorName = user.username; // Cargar el nombre del profesor
      }
    }
  }

  // Método para redirigir a la página profesor/qrprofesor
  goToQrProfesor() {
    this.navCtrl.navigateForward('/profesor/qrprofesor');
  }

  // Método para redirigir a la página del clima
  irAWeather() {
    this.navCtrl.navigateForward('/weather');
  }
}
