import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { FoundationsComponent } from './components/foundations/foundations.component';
import { HistoryComponent } from './components/history/history.component';
import { PointsComponent } from './components/points/points.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserComponent } from './components/user/user.component';
import { CheckLoginGuard } from './guards/check-login.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent,
  },
  {
    path: 'user',
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
        canActivate: [CheckLoginGuard]
      },
      {
        path: 'security',
        component: UserSecurityComponent,
        canActivate: [CheckLoginGuard]
      },
      {
        path: 'foundations',
        component: FoundationsComponent,
        canActivate: [CheckLoginGuard]
      },
      {
        path: 'history',
        component: HistoryComponent,
        canActivate: [CheckLoginGuard]
      },
      {
        path: 'points',
        component: PointsComponent,
        canActivate: [CheckLoginGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
