import { Routes } from '@angular/router';
import { LoginComponent } from './features/authentication/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard],data: { animation: 'home' } },
  { path: 'login', component: LoginComponent,canActivate: [LoginGuard] ,data: { animation: 'login' }},
  { path: '**', redirectTo: '' },
];
