import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FoundationProfileComponent } from './components/foundation-profile/foundation-profile.component';
import { FoundationsComponent } from './components/foundations/foundations.component';
import { HistoryComponent } from './components/history/history.component';
import { PointsComponent } from './components/points/points.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { UsersService } from './services/users.service';

import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserComponent,
    FoundationProfileComponent,
    UserSecurityComponent,
    FoundationsComponent,
    HistoryComponent,
    FooterComponent,
    PointsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [
    UsersService
  ]
})
export class UserModule { }
