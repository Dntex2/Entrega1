import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  unLogged() {
    console.log('Cerrando sesión'); // Verifica que esto aparezca en la consola
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/home']);
  }
}
