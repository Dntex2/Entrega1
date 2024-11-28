import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  username: string = '';
  newPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onResetPassword() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (this.username === user.username) {
        // Actualiza la contraseña en el objeto almacenado
        user.password = this.newPassword;
        localStorage.setItem('user', JSON.stringify(user));

        // Mensaje de éxito
        this.successMessage = 'Contraseña restablecida con éxito.';
        this.errorMessage = '';

        // Redirige al inicio de sesión
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Nombre de usuario no coincide.';
        this.successMessage = '';
      }
    } else {
      this.errorMessage = 'No hay usuario registrado.';
      this.successMessage = '';
    }
  }
}
