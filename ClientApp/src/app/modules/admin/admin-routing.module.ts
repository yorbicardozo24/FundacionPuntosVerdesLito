import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminSecurityComponent } from './components/admin-security/admin-security.component';
import { FoundationsComponent } from './components/foundations/foundations.component';
import { UsersComponent } from './components/users/users.component';

import { CheckRoleGuard } from './guards/check-role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: AdminProfileComponent,
        canActivate: [CheckRoleGuard],
      },
      {
        path: 'security',
        component: AdminSecurityComponent,
        canActivate: [CheckRoleGuard],
      },
      {
        path: 'foundations',
        component: FoundationsComponent,
        canActivate: [CheckRoleGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [CheckRoleGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
