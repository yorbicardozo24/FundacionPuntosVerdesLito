import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from '../../models/Users';
import Swal from 'sweetalert2';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { DepartmentsService } from 'src/app/modules/user/services/departments.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }
    `],
  providers: [MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  user: User;
  private subscription: Subscription[] = [];
  userDialog: boolean;
  submitted = false;
  departments: any[];
  municipios: any[];
  nMunicipios: boolean;

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private departmentsService: DepartmentsService) { }

  ngOnInit(): void {
    this.nMunicipios = false;
    this.getUsers();
    this.getDepartments();
  }

  getUsers(): void {
    this.subscription.push(
      this.usersService.getUsers().subscribe((res) => {
        if (res) {
          this.users = res.message;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  openNew(): void {
    this.user = {
      id: 0,
      name: '',
      nit: '',
      email: '',
      departments: {code: 0, name: ''},
      municipios: {code: 0, name: ''},
      points: 0,
      role: 'USER',
    };
    this.userDialog = true;
  }

  editUser(user: User): void {
    this.user = {...user};
    const departmentCode = this.user.departments.code;
    this.getMunicipios(departmentCode);
    this.userDialog = true;
  }

  deleteUser(id: string): void {
    this.confirmationService.confirm({
      message: '¿Deseas eliminar este usuario?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.subscription.push(
          this.usersService.deleteUser(id).subscribe((res) => {
            if (res) {
              this.getUsers();
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
          })
        );
      }
    });
  }

  hideDialog(): void {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser(): any {
    this.submitted = true;
    if (this.user.name.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Nombre es requerido',
      });
    }
    if (this.user.email.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Email es requerido',
      });
    }
    if (this.user.departments.name.trim() === '' || this.user.departments.code === 0){
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Departamento es requerido',
      });
    }
    if (this.user.municipios.name.trim() === '' || this.user.municipios.code === 0){
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Municipio es requerido',
      });
    }

    if (this.user.id) {
      this.subscription.push(
        this.usersService.patchUser(this.user.id, this.user).subscribe((res) => {
          if (res) {
            this.userDialog = false;
            this.getUsers();
            return Swal.fire({
              icon: 'success',
              title: 'Bien hecho!',
              text: res.message,
            });
          }
        }, (err) => {
          this.userDialog = false;
          return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error.message,
          });
        })
      );
    }else{
      this.subscription.push(
        this.usersService.saveUser(this.user).subscribe((res) => {
          if (res) {
            this.userDialog = false;
            this.getUsers();
            return Swal.fire({
              icon: 'success',
              title: 'Bien hecho!',
              text: res.message,
            });
          }
        }, (err) => {
          this.userDialog = false;
          return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error.message,
          });
        })
      );
    }
  }

  changeDepartments(id: number): void {
    this.municipios = [];
    this.nMunicipios = false;
    this.getMunicipios(id);
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

  getDepartments(): void {
    this.subscription.push(
      this.departmentsService.getDepartments().subscribe((res) => {
        if (res) {
          this.departments = res.departments;
        }
      }, (err) => console.log(err)));
  }

}
