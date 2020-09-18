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

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


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
    ConfirmDialogModule,
    InputNumberModule,
    RadioButtonModule,
    ToolbarModule,
    RatingModule,
    TableModule,
    FileUploadModule,
    DialogModule,
    ToastModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
