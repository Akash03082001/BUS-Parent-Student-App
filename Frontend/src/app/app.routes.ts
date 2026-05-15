import { provideRouter, Routes, withRouterConfig } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth/auth-guard';
import { ProfileComponent } from './dashboard/profile/profile';
import { StudentsComponent } from './dashboard/students/students';
import { AddStudentComponent } from './dashboard/students/add/add';
import { EditComponent } from './dashboard/students/edit/edit';
import { HomeComponent } from './dashboard/home/home';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { adminGuard } from './admin/admin-dashboard/adminGuard';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { AdminProfile } from './admin/admin-profile/admin-profile';
import { AdminStudents } from './admin/admin-students/admin-students';
import { AdminEditStudent  } from './admin/admin-edit-student/admin-edit-student';
import { AdminParents } from './admin/admin-parents/admin-parents';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
{
  path: 'admin',
  component: AdminLayout,
  canActivate: [adminGuard],
  children: [
    { path: 'dashboard', component: AdminDashboard },
    { path: 'parents', component: AdminParents },
    // { path: 'parents/edit/:id', component: AdminParents },
    { path: 'students', component: AdminStudents },
    { path: 'profile', component: AdminProfile },
    { path: 'students/edit/:id', component: AdminEditStudent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
},
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

