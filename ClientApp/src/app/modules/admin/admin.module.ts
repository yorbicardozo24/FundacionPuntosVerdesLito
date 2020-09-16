import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminSecurityComponent } from './components/admin-security/admin-security.component';
import { AdminComponent } from './components/admin/admin.component';
import { FoundationsComponent } from './components/foundations/foundations.component';


@NgModule({
  declarations: [AdminProfileComponent, AdminSecurityComponent, AdminComponent, FoundationsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
