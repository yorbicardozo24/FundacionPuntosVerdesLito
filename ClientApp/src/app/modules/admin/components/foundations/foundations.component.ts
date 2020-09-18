import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Foundation } from '../../models/Foundations';
import { FoundationsService } from '../../services/foundations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foundations',
  templateUrl: './foundations.component.html',
  styleUrls: ['./foundations.component.css'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }
    `],
  providers: [MessageService, ConfirmationService]
})
export class FoundationsComponent implements OnInit, OnDestroy {

  foundations: any[] = [];
  private subscription: Subscription[] = [];
  foundationDialog: boolean;
  submitted = false;
  foundation: Foundation;

  constructor(
    private foundationsService: FoundationsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getFoundations();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  getFoundations(): void {
    this.subscription.push(
      this.foundationsService.getFoundations().subscribe((res) => {
        this.foundations = res.foundations;
      })
    );
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
      if (this.foundation.description.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Descripción es requerido',
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
          this.foundationsService.saveFoundation(this.foundation).subscribe((res) => {
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
    this.foundation = {...foundation};
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
    this.foundation = {
      id: 0,
      name: '',
      description: '',
      image: '',
      points: 0
    };
    this.foundationDialog = true;
  }

}
