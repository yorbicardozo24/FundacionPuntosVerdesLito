import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartmentsService } from 'src/app/modules/user/services/departments.service';
import { UsersService } from 'src/app/modules/user/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];

  userId = JSON.parse(localStorage.getItem('user')).userId;
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
    private departmentsService: DepartmentsService) { }

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

  changeDepartments(id: number): void {
    this.municipios = [];
    this.nMunicipios = false;
    this.getMunicipios(id);
  }

  saveUserData(): any {
    if (this.userData.name.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Nombre es requerido',
      });
    }
    if (this.userData.departments.name.trim() === '' || this.userData.departments.code === 0){
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Departamento es requerido',
      });
    }
    if (this.userData.municipios.name.trim() === '' || this.userData.municipios.code === 0){
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Municipio es requerido',
      });
    }

    this.subscription.push(
      this.usersService.updateUser(this.userId, this.userData).subscribe((res) => {
        if (res) {

          let userStorage = JSON.parse(localStorage.getItem('user'));

          userStorage = {
            token: userStorage.token,
            userId: userStorage.userId,
            userName: this.userData.name,
            userPoints: userStorage.userPoints,
            userImage: userStorage.userImage,
            message: userStorage.message,
            role: userStorage.role
          };

          localStorage.setItem('user', JSON.stringify(userStorage));

          this.usersService.UserNameService(this.userData.name);

          return Swal.fire({
            icon: 'success',
            title: 'Bien hecho!',
            text: res.message,
          });
        }
      }, (err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.error.message,
        });
      }));

  }

}
