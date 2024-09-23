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
    const storedUsername = localStorage.getItem('username');

    if (this.username === storedUsername) {
      localStorage.setItem('password', this.newPassword);
      this.successMessage = 'Contraseña restablecida con éxito.';
      this.errorMessage = '';
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Credenciales invalidas. Intentalo de nuevo.';
      this.successMessage = '';
    }
  }
}