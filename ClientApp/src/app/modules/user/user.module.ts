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
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './components/user/user.component';
import { DonateComponent } from './components/donate/donate.component';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ThousandsPipe } from './components/foundations/foundations.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    ThousandsPipe,
    UserComponent,
    FoundationProfileComponent,
    UserSecurityComponent,
    FoundationsComponent,
    HistoryComponent,
    FooterComponent,
    PointsComponent,
    DonateComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ConfirmDialogModule,
    InputNumberModule,
    ToastModule,
    RadioButtonModule,
    DialogModule,
    RatingModule,
    FileUploadModule,
    ToolbarModule,
    UserRoutingModule
  ],
  providers: [
    UsersService
  ]
})
export class UserModule { }
