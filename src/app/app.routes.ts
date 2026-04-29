import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth/auth-guard';
import { ProfileComponent } from './dashboard/profile/profile';
import { StudentsComponent } from './dashboard/students/students';
import { AddStudentComponent } from './dashboard/students/add/add';
import { EditComponent } from './dashboard/students/edit/edit';
import { HomeComponent } from './dashboard/home/home';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'addStudent', component: AddStudentComponent },
      { path: 'editStudent/:id', component: EditComponent },

      // ✅ default landing page
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

