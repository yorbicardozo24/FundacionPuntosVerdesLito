import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserComponent } from './components/user/user.component';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { FoundationsComponent } from './components/foundations/foundations.component';
import { HistoryComponent } from './components/history/history.component';
import { PointsComponent } from './components/points/points.component';
import { DonateComponent } from './components/donate/donate.component';

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
      },
      {
        path: 'security',
        component: UserSecurityComponent,
      },
      {
        path: 'foundations',
        component: FoundationsComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'points',
        component: PointsComponent,
      },
      {
        path: 'donate',
        component: DonateComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
