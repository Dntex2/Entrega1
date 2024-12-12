import { Component } from '@angular/core';
import { DatabaseService } from '../servicios/database.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';  // Importa LoadingController

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
  loading: boolean = false;  // Variable para controlar el estado de loading

  constructor(
    private db: DatabaseService, 
    private router: Router,
    private loadingController: LoadingController  // Inyecta LoadingController
  ) {}

  // Función para mostrar el Loading
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
      spinner: 'crescent', // Tipo de spinner
      duration: 0, // Tiempo indefinido
    });
    await loading.present();
  }

  // Función para ocultar el Loading
  async hideLoading() {
    await this.loadingController.dismiss();
  }

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
      // Mostrar el loading
      this.showLoading();

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
    } finally {
      // Ocultar el loading
      this.hideLoading();
    }
  }
}