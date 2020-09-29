import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Foundation, FoundationX } from '../../models/Foundations';
import { FoundationsService } from '../../services/foundations.service';
import { DepartmentsService } from 'src/app/modules/user/services/departments.service';
import Swal from 'sweetalert2';

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
  foundationDialog: boolean;
  submitted = false;
  edit = false;
  file: File;
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

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
    }
  }

  saveFoundation(): any {
    this.submitted = true;

    if (this.foundation.name.trim()) {
      if (this.foundation.name.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Nombre es requerido',
        });
      }
      if (this.foundation.nit.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'NIT es requerido',
        });
      }
      if (this.foundation.email.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Email es requerido',
        });
      }
      if (this.foundation.description.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Descripción es requerido',
        });
      }
      if (this.foundation.cs.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Causa social es requerido',
        });
      }
      if (this.foundation.ods.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'ODS es requerido',
        });
      }
      if (this.foundation.departments.name.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Departamento es requerido',
        });
      }
      if (this.foundation.municipios.name.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Municipio es requerido',
        });
      }
      if (this.foundation.id) {
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
        this.subscription.push(
          this.foundationsService.saveFoundation(this.foundation, this.file).subscribe((res) => {
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
    this.foundation = {
      id: 0,
      name: '',
      description: '',
      image: '',
      email: '',
      nit: '',
      points: '0',
      cs: '',
      ods: '',
      departments: {code: '0', name: ''},
      municipios: {code: '0', name: ''},
    };
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
