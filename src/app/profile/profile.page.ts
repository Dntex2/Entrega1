import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: { nombre: string; gmail: string; rut: string } | null = null;

  constructor(
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.presentLoading(); // Mostrar cargador
    this.loadUserData(); // Cargar los datos del usuario logueado
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 500, // Duración del cargador en milisegundos
    });
    await loading.present();
  }

  loadUserData() {
    // Obtener los datos del usuario desde el LocalStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.user = {
        nombre: parsedUser.nombre || 'Alumno',
        gmail: parsedUser.gmail || parsedUser.email || 'Sin correo registrado', // Compatibilidad con "gmail"
        rut: parsedUser.rut || 'N/A',
      };
    } else {
      // Usuario no encontrado en el localStorage
      this.user = { nombre: 'Alumno', gmail: 'Sin correo registrado', rut: 'N/A' };
    }
  }
  

  goToResetPassword() {
    console.log('Navegando a /restablecer');
    this.router.navigateByUrl('/restablecer');
  }

  unLogged() {
    console.log('Cerrando sesión');
    // Limpiar el estado del usuario en LocalStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    // Redirigir al inicio
    this.router.navigate(['/home']);
  }
}
