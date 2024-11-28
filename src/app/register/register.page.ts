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
  email: string = ''; // Correo del profesor
  errorMessage: string = ''; // Mensaje de error

  constructor(private router: Router) {}

  // Validar si el correo tiene un formato válido
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Acepta cualquier dominio
    return emailRegex.test(email);
  }

  onRegister() {
    this.errorMessage = ''; // Limpia el mensaje de error previo

    // Validar que todos los campos estén completos
    if (!this.username || !this.password || (this.isProfessor && !this.email)) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return; // Detener el registro si faltan datos
    }

    // Validar el correo si es profesor
    if (this.isProfessor && !this.isValidEmail(this.email)) {
      this.errorMessage = 'El correo electrónico debe ser válido.';
      return; // Detener el registro si el correo no es válido
    }

    // Crear el objeto usuario
    const user = {
      username: this.username,
      password: this.password,
      isProfessor: this.isProfessor,
      email: this.isProfessor ? this.email : null,
    };

    // Guardar el usuario en LocalStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Redirigir al login
    this.router.navigate(['/home']);
  }
}
