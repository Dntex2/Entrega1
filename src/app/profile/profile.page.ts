import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: { username: string; isProfessor: boolean; email?: string} | null = null;

  constructor(private router: Router, private loadingController: LoadingController) {
    
  }

  ngOnInit() {
    this.presentLoading();
    this.loadUserData();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 100 
    });
    await loading.present();
  }

  loadUserData() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser); 
    } else {
      this.user = { username: 'Usuario', isProfessor: false }; 
    }
  }

  goToResetPassword() {
    this.router.navigate(['/restablecer']); 
  }

  // Función para cerrar sesión
  unLogged() {
    console.log('Cerrando sesión'); 
    localStorage.removeItem('isLoggedIn'); 
    this.router.navigate(['/home']);
  }
}