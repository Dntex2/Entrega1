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
    const initialItems = [
      { name: 'Arquitectura', code: '2024-2_ASY4131_24229156_PCT', professor: 'Alberto Menéndez Silva', color: '#c2e1ff' },
      { name: 'Calidad de Software', code: '2024-2_CSY4111_24229166_PCT', professor: 'Daniela Rodríguez Pérez', color: '#ffdad6' },
      { name: 'Estadística Descriptiva', code: '2024-2_MAT4140_24229174_PCT', professor: 'Luis Gómez Vargas', color: '#ffedba' },
      { name: 'Ética para el Trabajo', code: '2024-2_EAY4450_24229175_PCT', professor: 'María Torres Ávila', color: '#d4e5ff' },
    ];
    this.items.push(...initialItems);
  }

  // Detecta el evento de scroll
  @HostListener('ionScroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop;
  }
}
