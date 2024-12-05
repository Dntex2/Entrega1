import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = ''; // Nombre del usuario
  password: string = ''; // Contraseña del usuario
  isProfessor: boolean = false; // Indica si el usuario es profesor
  email: string = ''; // Correo del profesor (opcional si no es profesor)
  errorMessage: string = ''; // Mensaje de error

  constructor(private router: Router) {}

  // Validar si el correo tiene un formato válido
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onRegister() {
    this.errorMessage = ''; // Limpia cualquier mensaje de error previo

    // Validar que todos los campos requeridos estén completos
    if (!this.username || !this.password || (this.isProfessor && !this.email)) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    // Validar el correo si es profesor
    if (this.isProfessor && !this.isValidEmail(this.email)) {
      this.errorMessage = 'El correo electrónico debe ser válido.';
      return;
    }

    // Crear el objeto usuario
    const user = {
      username: this.username,
      password: this.password,
      isProfessor: this.isProfessor,
      email: this.isProfessor ? this.email : null,
    };

    // Guardar los datos del usuario en LocalStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Redirigir siempre a home (login)
    this.router.navigate(['/home']);
  }
}
