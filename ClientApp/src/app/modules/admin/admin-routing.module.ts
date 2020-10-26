import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminSecurityComponent } from './components/admin-security/admin-security.component';
import { FoundationsComponent } from './components/foundations/foundations.component';
import { UsersComponent } from './components/users/users.component';

import { CheckRoleGuard } from './guards/check-role.guard';
import { ReportComponent } from './components/report/report.component';
import { HistoryAdminComponent } from './components/history-admin/history-admin.component';
import { FoundationComponent } from '../user/components/foundation/foundation.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';

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
        path: 'foundation/:id',
        component: FoundationComponent,
        canActivate: [CheckRoleGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [CheckRoleGuard],
      },
      {
        path: 'admins',
        component: AdministratorsComponent,
        canActivate: [CheckRoleGuard],
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [CheckRoleGuard],
      },
      {
        path: 'history-admin',
        component: HistoryAdminComponent,
        canActivate: [CheckRoleGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
