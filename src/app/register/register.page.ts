import { Component } from '@angular/core';
import { DatabaseService } from '../servicios/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  rut: string = '';
  password: string = '';
  isProfessor: boolean = false;
  email: string = '';
  errorMessage: string = '';

  constructor(private db: DatabaseService, private router: Router) {}

  async onRegister() {
    // Validar que los campos no estén vacíos
    if (!this.name || !this.rut || !this.password || (this.isProfessor && !this.email)) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    // Crear el objeto usuario
    const user = {
      name: this.name,
      rut: this.rut,
      password: this.password,
      isProfessor: this.isProfessor,
      email: this.isProfessor ? this.email : null,
    };

    try {
      // Guardar en la colección correspondiente
      if (this.isProfessor) {
        await this.db.addProfessor(user); // Agregar a "professors"
      } else {
        await this.db.addStudent(user); // Agregar a "students"
      }

      // Redirigir al login después del registro exitoso
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      this.errorMessage = 'Ocurrió un error durante el registro. Inténtalo nuevamente.';
    }
  }
}
