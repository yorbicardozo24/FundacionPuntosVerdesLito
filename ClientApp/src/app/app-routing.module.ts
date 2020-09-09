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


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
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
        component: UserProfileComponent
      },
      {
        path: 'security',
        component: UserSecurityComponent
      },
      {
        path: 'foundations',
        component: FoundationsComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'points',
        component: PointsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
