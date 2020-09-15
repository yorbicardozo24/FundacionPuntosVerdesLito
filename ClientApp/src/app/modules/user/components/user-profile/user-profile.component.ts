import { Component, OnDestroy, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { DepartmentsService } from '../../services/departments.service';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { GalleriaThumbnails } from 'primeng';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];

  userId = JSON.parse(localStorage.getItem('user')).userId;
  spinner: boolean;
  selectedCountry: string;
  departments: any[];
  municipios: any[];
  nMunicipios: boolean;

  public userData = {
    name: '',
    nit: '',
    email: '',
    departments: {code: 0, name: ''},
    municipios: {code: 0, name: ''}
  };

  constructor(
    private usersService: UsersService,
    private departmentsService: DepartmentsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.nMunicipios = false;

    this.subscription.push(

      this.usersService.getUser(this.userId).subscribe((res) => {

        if (res){
          this.userData.name = res.name;
          this.userData.nit = res.nit;
          this.userData.email = res.email;
          this.userData.departments = {code: res.departments.code, name: res.departments.name};
          this.userData.municipios = {code: res.municipios.code, name: res.municipios.name};

          const departmentCode = this.userData.departments.code;
          this.getDepartments();
          this.getMunicipios(departmentCode);

        }

      }, (err) => console.log(err)));

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  getDepartments(): void {
    this.subscription.push(
      this.departmentsService.getDepartments().subscribe((res) => {
        if (res) {
          this.departments = res.departments;
        }
      }, (err) => console.log(err)));
  }

  getMunicipios(id: number): void {
    this.subscription.push(
      this.departmentsService.getMunicipio(id).subscribe((res) => {
        if (res) {
          this.municipios = res.municipalities;
          this.nMunicipios = true;
        }
      }, (err) => console.log(err)));
  }

  saveUserData(): void {
    console.log(this.userData.departments);
    console.log(this.userData.municipios);
  }


  changeDepartments(id: number): void {
    this.municipios = [];
    this.nMunicipios = false;
    this.getMunicipios(id);
  }

}
