import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../servicios/database.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  rut: string = '';
  newPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private db: DatabaseService) {}

  async onResetPassword() {
    try {
      // Busca al usuario en la colección "students" por su RUT
      const user = await this.db.getUserByRut(this.rut);

      if (!user) {
        this.errorMessage = 'El RUT no existe en la base de datos.';
        this.successMessage = '';
        return;
      }

      // Actualiza la contraseña especificando la colección
      await this.db.updatePassword('students', user.id, this.newPassword);

      this.successMessage = 'Contraseña restablecida con éxito.';
      this.errorMessage = '';

      // Opcional: Redirige al login después de unos segundos
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      this.errorMessage = 'Hubo un error al restablecer la contraseña.';
      this.successMessage = '';
    }
  }
}
