import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName: string | null = ''; // Nombre del usuario

  constructor(private router: Router, private loadingController: LoadingController) {
    
  }

  ngOnInit() {
    this.presentLoading();
    // Obtener el nombre de usuario desde el almacenamiento local
    this.userName = localStorage.getItem('username');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 100 
    });
    await loading.present();
  }

  // Función para cerrar sesión
  unLogged() {
    console.log('Cerrando sesión'); //  Esto aparece en la consola
    localStorage.removeItem('isLoggedIn'); // Cerrar la sesión del almacenamiento local
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }

  goToResetPassword() {
    this.router.navigate(['/restablecer']);
  }
}