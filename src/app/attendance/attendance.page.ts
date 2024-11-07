import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  // Arreglo para almacenar items (asignaturas)
  items: any[] = [];
  // Almacena la posición del scroll previa
  lastScrollTop: number = 0;
  // Bandera para determinar si se está haciendo scroll hacia abajo
  isScrollingDown: boolean = false;

  constructor() {}

  ngOnInit() {
    // Carga inicial de los items
    this.loadInitialItems();
  }

  loadInitialItems() {
    // Lista de items de ejemplo (asignaturas)
    const initialItems = [
      { name: 'Arquitectura', code: '2024-2_ASY4131_24229156_PCT', professor: 'Alberto Menéndez Silva', color: '#c2e1ff' },
      { name: 'Calidad de Software', code: '2024-2_CSY4111_24229166_PCT', professor: 'Daniela Rodríguez Pérez', color: '#ffdad6' },
      { name: 'Estadística Descriptiva', code: '2024-2_MAT4140_24229174_PCT', professor: 'Luis Gómez Vargas', color: '#ffedba' },
      { name: 'Ética para el Trabajo', code: '2024-2_EAY4450_24229175_PCT', professor: 'María Torres Ávila', color: '#d4e5ff' },
      { name: 'Inglés Intermedio', code: '2024-2_INI5111_24237773_PCT', professor: 'Roberto Salazar Ortiz', color: '#ffd6e8' },
      { name: 'Programación de Aplicaciones Móviles', code: '2024-2_PGY4121_24229162_PCT', professor: 'Laura Jiménez Sánchez', color: '#d7ffd4' }
    ];
    // Añade los items iniciales al arreglo principal
    this.items.push(...initialItems);
  }

  // Detecta el evento de scroll
  @HostListener('ionScroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    // Determina si el scroll es hacia abajo o arriba
    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop;
  }

  // Muestra detalles del item en un mensaje
  showDetails(item: any) {
    console.log("Detalles de la asignatura:", item);
    alert(`Detalles de ${item.name}\nProfesor: ${item.professor}\nCódigo: ${item.code}`);
  }
}
