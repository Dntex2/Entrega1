import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName: string | null = ''; // Nombre del usuario

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    // Obtener el nombre de usuario desde el almacenamiento local
    this.userName = localStorage.getItem('username');
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