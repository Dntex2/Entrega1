import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // Enlace a la página register
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./restablecer/restablecer.module').then(m => m.RestablecerPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'not-found404',
    loadChildren: () => import('./not-found404/not-found404.module').then(m => m.NotFound404PageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then(m => m.QRPageModule) // Ruta para QRPage
  },
{
  path: 'weather',
  loadChildren: () => import('./weather/weather.module').then( m => m.WeatherPageModule)
},
  {
    path: 'not-found404',
    loadChildren: () => import('./not-found404/not-found404.module').then(m => m.NotFound404PageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
