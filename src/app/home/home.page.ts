import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  rememberMe: boolean = false;



  constructor(private router: Router) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn){
      this.router.navigate(['/inicio'])
    }
  }
  onSubmit() {
    const storedUser = localStorage.getItem('user'); // Recupera el objeto `user`
    if (storedUser) {
      const user = JSON.parse(storedUser); 

      if (this.username === user.username && this.password === user.password) {
        // Guardar sesión si se seleccionó "Recordar mis credenciales"
        if (this.rememberMe) {
          localStorage.setItem('isLoggedIn', 'true');
        }
        
        this.router.navigate(['/inicio']); 
      } else {
        this.errorMessage = 'Credenciales invalidas. Intentalo de nuevo.';
      }
    } else {
      this.errorMessage = 'No hay una cuenta registrada. Por favor, regístrate.';
    }
  }
}

