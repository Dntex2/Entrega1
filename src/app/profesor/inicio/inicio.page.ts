import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/servicios/database.service'; // Servicio para acceder a la base de datos

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  professor: any = null; // Datos del profesor
  errorMessage: string = ''; // Mensaje de error

  constructor(private db: DatabaseService) {}

  async ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.rut) {
        try {
          // Busca al profesor por RUT
          this.professor = await this.db.getProfessorByRut(parsedUser.rut);

          if (!this.professor) {
            this.errorMessage = 'Profesor no encontrado.';
          }
        } catch (error) {
          console.error('Error al cargar datos del profesor:', error);
          this.errorMessage = 'Error al cargar los datos del profesor.';
        }
      } else {
        this.errorMessage = 'RUT no válido.';
      }
    } else {
      this.errorMessage = 'No hay un usuario logueado.';
    }
  }

  irAWeather() {
    console.log('Redirigiendo a la página del clima...');
  }
}
