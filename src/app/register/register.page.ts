import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username : string = '';
  password : string = '';
  errorMessage : string = '';
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.username && this.password) {
      // Almacenar los datos en localStorage
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      this.router.navigate(['/home']);  // Redirigir a la página de login
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }



}
