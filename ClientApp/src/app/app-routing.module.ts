import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { FoundationsComponent } from './components/foundations/foundations.component';
import { HistoryComponent } from './components/history/history.component';
import { PointsComponent } from './components/points/points.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
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
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
