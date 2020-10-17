import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserComponent } from './components/user/user.component';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { FoundationsComponent } from './components/foundations/foundations.component';
import { HistoryComponent } from './components/history/history.component';
import { PointsComponent } from './components/points/points.component';
import { DonateComponent } from './components/donate/donate.component';
import { FoundationComponent } from './components/foundation/foundation.component';
import { CheckRoleGuard } from './guards/check-role.guard';
import { CheckLoginGuard } from '../../guards/check-login.guard';
import { AuthGuardGuard } from '../../guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [CheckLoginGuard, CheckRoleGuard]
      },
      {
        path: 'security',
        component: UserSecurityComponent,
        canActivate: [CheckLoginGuard, CheckRoleGuard],
      },
      {
        path: 'foundations',
        component: FoundationsComponent,
        canActivate: [CheckLoginGuard, CheckRoleGuard],
      },
      {
        path: 'foundation/:id',
        component: FoundationComponent,
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'history',
        component: HistoryComponent,
        canActivate: [CheckLoginGuard, CheckRoleGuard],
      },
      {
        path: 'points',
        component: PointsComponent,
        canActivate: [CheckLoginGuard, CheckRoleGuard],
      },
      {
        path: 'donate',
        component: DonateComponent,
        canActivate: [CheckLoginGuard, CheckRoleGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
