import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../servicios/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  rut: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private db: DatabaseService) {}

  async onLogin() {
    try {
      // Validar en la colección de estudiantes
      const student = await this.db.getUserByRutAndPassword(this.rut, this.password);
      if (student) {
        // Guardar usuario en LocalStorage y redirigir
        localStorage.setItem('user', JSON.stringify(student));
        this.router.navigate(['/inicio']);
        return;
      }

      // Validar en la colección de profesores
      const professor = await this.db.getProfessorByRutAndPassword(this.rut, this.password);
      if (professor) {
        // Guardar usuario en LocalStorage y redirigir
        localStorage.setItem('user', JSON.stringify(professor));
        this.router.navigate(['/profesor/inicio']);
        return;
      }

      // Si no se encuentra el usuario
      this.errorMessage = 'RUT o contraseña incorrectos.';
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.errorMessage = 'Error al intentar iniciar sesión.';
    }
  }
}
