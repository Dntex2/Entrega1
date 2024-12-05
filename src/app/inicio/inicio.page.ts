import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  studentName: string = '';

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.studentName = user?.nombre || 'Estudiante'; // Usar el nombre del estudiante
    }
  }

  irAWeather() {
    this.router.navigate(['/weather']);
  }
}
