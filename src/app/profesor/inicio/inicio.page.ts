import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  professor: any = null; // Datos del profesor
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.loadProfessorData(); // Cargar datos al iniciar
  }

  async loadProfessorData() {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.isProfessor) {
          const professorData = await this.db.getProfessorByRut(user.rut);
          if (professorData) {
            this.professor = professorData;
          } else {
            this.errorMessage = 'No se encontraron datos del profesor.';
          }
        } else {
          this.errorMessage = 'El usuario no es un profesor.';
        }
      } else {
        this.errorMessage = 'No hay usuario logueado.';
      }
    } catch (error) {
      console.error('Error al cargar datos del profesor:', error);
      this.errorMessage = 'Error al cargar datos del profesor.';
    }
  }
  
  irAWeather() {
    this.navCtrl.navigateForward('/weather');
  }
}
