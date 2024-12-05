import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: { username: string; isProfessor: boolean; email?: string } | null = null;

  constructor(
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.presentLoading(); // Mostrar el cargador
    this.loadUserData(); // Cargar los datos del usuario
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 100, // Duración del cargador en milisegundos
    });
    await loading.present();
  }

  loadUserData() {
    // Obtener los datos del usuario desde el LocalStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser); 
    } else {
      this.user = { username: 'Usuario', isProfessor: true, email: 'Sin correo registrado' };
    }
  }

  irAWeather() {
    console.log('Navegando a /weather');
    this.router.navigateByUrl('/weather');
  }

  unLogged() {
    console.log('Cerrando sesión');
    // Limpiar el estado del usuario en LocalStorage
    localStorage.removeItem('isLoggedIn');
    // Redirigir al inicio
    this.router.navigate(['/home']);
  }
}
