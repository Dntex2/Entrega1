import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      this.router.navigate(['/inicio']); // Redirigir automáticamente si está logueado
    }
  }

  onSubmit() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (this.username === user.username && this.password === user.password) {
        if (this.rememberMe) {
          localStorage.setItem('isLoggedIn', 'true');
        }

        // Decidir redirección según el rol del usuario
        if (user.isProfessor) {
          this.router.navigate(['/profesor/inicio']); // Redirigir a la página del profesor
        } else {
          this.router.navigate(['/inicio']); // Redirigir a la página del estudiante
        }
      } else {
        this.errorMessage = 'Credenciales inválidas. Intenta de nuevo.';
      }
    } else {
      this.errorMessage = 'No hay una cuenta registrada. Por favor, regístrate.';
    }
  }
}
