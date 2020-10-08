import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterUserComponent } from './components/register-user/register-user.component';

import { UserModule } from './modules/user/user.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CodeRandomComponent } from './components/code-random/code-random.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterUserComponent,
    ForgetPasswordComponent,
    CodeRandomComponent
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    BrowserAnimationsModule,
    MenubarModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
