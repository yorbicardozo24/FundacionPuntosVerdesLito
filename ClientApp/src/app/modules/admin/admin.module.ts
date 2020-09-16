import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminSecurityComponent } from './components/admin-security/admin-security.component';
import { AdminComponent } from './components/admin/admin.component';
import { FoundationsComponent } from './components/foundations/foundations.component';
import { FooterComponent } from './components/footer/footer.component';
import { FoundationProfileComponent } from './components/foundation-profile/foundation-profile.component';
import { UsersComponent } from './components/users/users.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminProfileComponent,
    AdminSecurityComponent,
    AdminComponent,
    FoundationsComponent,
    FooterComponent,
    FoundationProfileComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
