import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RegisterService } from '../../services/register.service';
import { UserRegistration } from '../../models/UserRegistration';
import Swal from 'sweetalert2';
import { DepartmentsService } from 'src/app/modules/user/services/departments.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];

  user: UserRegistration = new UserRegistration();
  repeatPassword: string;
  terms: false;
  departments: any[];
  file: File;
  municipios: any[];
  nMunicipios: boolean;

  isLogged = false;
  isAdmin = false;
  isUser = false;

  constructor(
    private authSvc: AuthService,
    private registerService: RegisterService,
    private router: Router,
    private departmentsService: DepartmentsService
  ) { }

  ngOnInit(): void {
    this.getDepartments();

    this.subscription.push(
      this.authSvc.isLogged.subscribe( (res) => {
        this.isLogged = res;
        this.navigateAdmin();
        this.navigateUser();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  navigateAdmin(): any {

    this.subscription.push(
      this.authSvc.isAdmin.subscribe((res) => {
        this.isAdmin = res;
        if (this.isLogged) {
          if (this.isAdmin) {
            this.router.navigate(['/admin']).then(() => window.location.reload());
          }
        }
      })
    );
  }

  navigateUser(): any {
    this.subscription.push(
      this.authSvc.isUser.subscribe((res) => {
        this.isUser = res;
        if (this.isLogged) {
          if (this.isUser) {
            this.router.navigate(['/user']).then(() => window.location.reload());
          }
        }
      })
    );
  }

  validateCharacter(e: any): any {
    if (e.keyCode === 45) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Caracter no permitido',
      });
    }
  }

  onPaste(e: any): any {
    return Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Función no permitida',
    });
  }

  onRegister(): any {
    if (this.user.name === undefined || this.user.name.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Nombre es requerido',
      });
    }
    if (this.user.nit === undefined || this.user.nit === null) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Nit es requerido',
      });
    }
    if (this.user.dv === undefined || this.user.dv === null) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Dígito de verificación es requerido',
      });
    }
    if (this.user.email === undefined || this.user.email.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Email es requerido',
      });
    }
    if (this.user.tel === undefined || this.user.tel === null) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Número de contacto es requerido',
      });
    }
    if (this.user.password === undefined || this.user.password.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Contraseña es requerido',
      });
    }
    if (this.repeatPassword === undefined || this.repeatPassword === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Confirma tu contraseña es requerido',
      });
    }
    if (this.user.password !== this.repeatPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No coincide la contraseña',
      });
    }
    if (this.user.department === undefined || this.user.department.code === null) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Departamento es requerido',
      });
    }
    if (this.user.municipio === undefined || this.user.municipio.code === null) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Municipio es requerido',
      });
    }

    if (this.file === undefined) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Rut es requerido',
      });
    }

    this.subscription.push(
      this.registerService.register(this.user, this.file).subscribe((res) => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Bien hecho!',
            text: res.message,
          }).then((result) => {
            if (result.isConfirmed) {
              return this.router.navigate(['/login']);
            }
          });
        }
      }, (err) => {
        console.log(err);
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.error.message,
        });
      })
    );
  }

  changeTerms(e: any): void {
    this.terms = e.target.checked;
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
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
