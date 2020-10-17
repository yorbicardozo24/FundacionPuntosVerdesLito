import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Foundation, FoundationX } from '../../models/Foundations';
import { FoundationsService } from '../../services/foundations.service';
import { DepartmentsService } from 'src/app/modules/user/services/departments.service';
import { environment } from 'src/environments/environment';
import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';

@Pipe({
  name: 'thousandsPipe'
})

export class ThousandsPipe implements PipeTransform {

public transform(value: any) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
}

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-foundations',
  templateUrl: './foundations.component.html',
  styleUrls: ['./foundations.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class FoundationsComponent implements OnInit, OnDestroy {

  foundations: Foundation[] = [];
  private subscription: Subscription[] = [];
  userId = JSON.parse(localStorage.getItem('user')).userId;
  foundationDialog: boolean;
  environment = environment.IMG_URL;
  submitted = false;
  edit = false;
  file: File;
  ods: any[];
  cs: any[];
  foundationCs: any;
  departments: any[];
  municipios: any[];
  nMunicipios: boolean;
  foundation: FoundationX;

  constructor(
    private foundationsService: FoundationsService,
    private messageService: MessageService,
    private departmentsService: DepartmentsService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getFoundations();
    this.getDepartments();
    this.getOds();
    this.getCs();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  getFoundations(): void {
    this.subscription.push(
      this.foundationsService.getFoundations().subscribe((res) => {
        this.foundations = res.message;
      })
    );
  }

  getOds(): void {
    this.subscription.push(
      this.foundationsService.getOds().subscribe((res) => {
        this.ods = res.message;
      })
    );
  }

  getCs(): void {
    this.subscription.push(
      this.foundationsService.getCs().subscribe((res) => {
        this.cs = res.message;
      })
    );
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
    }
  }

  saveFoundation(): any {
    this.submitted = true;

    if (this.foundation.name === undefined || this.foundation.name.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Nombre es requerido',
      });
    }
    if (this.foundation.nit === undefined || this.foundation.nit.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'NIT es requerido',
      });
    }
    if (this.foundation.email === undefined || this.foundation.email.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Email es requerido',
      });
    }
    if (this.foundation.description === undefined || this.foundation.description.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Descripción es requerido',
      });
    }
    if (this.foundation.cs === undefined || this.foundation.cs.length <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Causa social es requerido',
      });
    }
    if (this.foundation.ods === undefined || this.foundation.ods.length <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'ODS es requerido',
      });
    }
    if (this.foundation.departments === undefined || this.foundation.departments === null) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Departamento es requerido',
      });
    }
    if (this.foundation.municipios === undefined || this.foundation.municipios === null) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Municipio es requerido',
      });
    }
    if (this.foundation.id) {
      this.foundation.userId = this.userId;
      this.subscription.push(
        this.foundationsService.updateFoundation(this.foundation, this.foundation.id).subscribe((res) => {
          if (res) {
            this.foundationDialog = false;
            this.getFoundations();
            return Swal.fire({
              icon: 'success',
              title: 'Bien hecho!',
              text: res.message,
            });
          }
        }, (err) => {
          this.foundationDialog = false;
          return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error.message,
          });
        }));
    }else{
      const csArray: any[] = [];
      for (const i of this.foundation.cs) {
        csArray.push({
          code: i.code
        });
      }
      const cs = JSON.stringify(csArray);

      const odsArray: any[] = [];
      for (const i of this.foundation.ods) {
        odsArray.push({
          code: i.code
        });
      }
      const ods = JSON.stringify(odsArray);
      const data = {
        name: this.foundation.name,
        nit: this.foundation.nit,
        description: this.foundation.description,
        ods,
        cs,
        points: this.foundation.points,
        email: this.foundation.email,
        departmentCode: this.foundation.departments.code,
        municipioCode: this.foundation.municipios.code
      };
      this.subscription.push(
        this.foundationsService.saveFoundation(data).subscribe((res) => {
          if (res) {
            this.foundationDialog = false;
            this.getFoundations();
            return Swal.fire({
              icon: 'success',
              title: 'Bien hecho!',
              text: res.message,
            });
          }
        }, (err) => {
          this.foundationDialog = false;
          return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error.message,
          });
        }));
    }
  }

  hideDialog(): void {
    this.foundationDialog = false;
    this.submitted = false;
  }

  editFoundations(foundation: any): void {
    this.edit = true;
    this.foundation = {...foundation};
    const departmentCode = this.foundation.departments.code;
    this.getMunicipios(departmentCode);
    this.foundationDialog = true;
  }

  deleteFoundations(id: number): void {
    this.confirmationService.confirm({
      message: '¿Deseas eliminar esta fundación?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.subscription.push(
          this.foundationsService.deleteFoundation(id).subscribe((res) => {
            if (res) {
              this.getFoundations();
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

  openNew(): void {
    this.edit = false;
    this.foundation = new FoundationX();
    this.foundationDialog = true;
  }

  changeDepartments(id: any): void {
    this.municipios = [];
    this.nMunicipios = false;
    this.getMunicipios(id);
  }

  getMunicipios(id: any): void {
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
