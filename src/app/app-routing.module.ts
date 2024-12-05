import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule),
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./restablecer/restablecer.module').then(m => m.RestablecerPageModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendancePageModule),
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then(m => m.QRPageModule),
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherPageModule),
  },
  {
    path: 'not-found404',
    loadChildren: () => import('./not-found404/not-found404.module').then(m => m.NotFound404PageModule),
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsPageModule),
  },
  {
    path: 'add-student',
    loadChildren: () => import('./add-student/add-student.module').then(m => m.AddStudentPageModule),
  },
  {
    path: 'profesor/inicio',
    loadChildren: () => import('./profesor/inicio/inicio.module').then(m => m.InicioPageModule),
  },
  {
    path: 'profesor/profile',
    loadChildren: () => import('./profesor/profile/profile.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'profesor/attendance',
    loadChildren: () => import('./profesor/attendance/attendance.module').then(m => m.AttendancePageModule),
  },
  {
    path: 'profesor/qrprofesor',
    loadChildren: () => import('./profesor/qrprofesor/qrprofesor.module').then( m => m.QrprofesorPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
