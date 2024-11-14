import { Component, OnInit, HostListener } from '@angular/core';
import { LoadingController } from '@ionic/angular';

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
  // Controla la visibilidad de las imágenes
  showImages: boolean = true;

  constructor(private  loadingController: LoadingController) {}

  ngOnInit() {
    this.presentLoading();
    // Carga inicial de los items
    this.loadInitialItems();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 100
    });
    await loading.present();
  }

  loadInitialItems() {
    const initialItems = [
      { name: 'Arquitectura', code: '2024-2_ASY4131_24229156_PCT', professor: 'Alberto Menéndez Silva', color: '#c2e1ff', image: 'arquitectura.png' },
      { name: 'Calidad de Software', code: '2024-2_CSY4111_24229166_PCT', professor: 'Daniela Rodríguez Pérez', color: '#ffdad6', image: 'calidad_software.png' },
      { name: 'Estadística Descriptiva', code: '2024-2_MAT4140_24229174_PCT', professor: 'Luis Gómez Vargas', color: '#ffedba', image: 'estadistica.png' },
      { name: 'Ética para el Trabajo', code: '2024-2_EAY4450_24229175_PCT', professor: 'María Torres Ávila', color: '#d4e5ff', image: 'etica.jpg' },
      { name: 'Inglés Intermedio', code: '2024-2_INI5111_24237773_PCT', professor: 'Roberto Salazar Ortiz', color: '#ffd6e8', image: 'ingles.jpg' },
      { name: 'Programación de Aplicaciones Móviles', code: '2024-2_PGY4121_24229162_PCT', professor: 'Laura Jiménez Sánchez', color: '#d7ffd4', image: 'moviles.png' }
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

  // Alterna la visibilidad de las imágenes
  toggleImages() {
    this.showImages = !this.showImages;
  }

  // Muestra detalles del item en un mensaje
  showDetails(item: any) {
    console.log("Detalles de la asignatura:", item);
    alert(`Detalles de ${item.name}\nProfesor: ${item.professor}\nCódigo: ${item.code}`);
  }
}
