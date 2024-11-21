import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
})
export class RestablecerPage {
  username: string = '';
  newPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onResetPassword() {
    const storedUser = localStorage.getItem('user'); // Obtiene el usuario almacenado

    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Verifica si el nombre de usuario coincide
      if (this.username === user.username) {
        user.password = this.newPassword; // Actualiza la contraseña
        localStorage.setItem('user', JSON.stringify(user)); // Guarda el usuario actualizado
        this.successMessage = 'Contraseña restablecida con éxito.';
        this.errorMessage = '';
        this.router.navigate(['/home']); // Redirige al login
      } else {
        this.errorMessage = 'Nombre de usuario inválido. Inténtalo de nuevo.';
        this.successMessage = '';
      }
    } else {
      this.errorMessage = 'No se encontró ningún usuario registrado.';
      this.successMessage = '';
    }
  }
}
