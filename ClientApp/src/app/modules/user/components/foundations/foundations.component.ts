import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FoundationsService } from 'src/app/modules/admin/services/foundations.service';
import { Foundation } from '../../models/Foundations';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-foundations',
  templateUrl: './foundations.component.html',
  styleUrls: ['./foundations.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class FoundationsComponent implements OnInit, OnDestroy {

  foundations: any[] = [];
  foundation: Foundation;
  points: 0;
  private subscription: Subscription[] = [];
  foundationDialog: boolean;
  submitted = false;
  public fundacionesForm = {
    donateAll: false,
    donatePart: false,
    donatePartNum: 0,
    fundaciones: {
      id: 0,
      name: ''
    }
  };

  constructor(
    private foundationsService: FoundationsService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.getFoundations();
    this.getPoints();
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

  openNew(): void {
    this.foundation = {
      id: 0,
      name: '',
    };
    this.foundationDialog = true;
  }

  hideDialog(): void {
    this.foundationDialog = false;
    this.submitted = false;
  }

  addDonate(foundation: Foundation): void {
    this.foundation = {...foundation};
    this.foundationDialog = true;
  }

  saveDonation(): any {
    this.submitted = true;

    if (this.foundation === null || this.foundation === undefined) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Por favor seleccione una fundación',
      });
    }

    if (!this.fundacionesForm.donateAll && !this.fundacionesForm.donatePart) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Por favor seleccione una opción de donación',
      });
    }

    if (this.fundacionesForm.donateAll) {

      console.log(this.points);
    }

    if (this.fundacionesForm.donatePart) {
      if (this.fundacionesForm.donatePartNum === 0) {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Por favor digite una cantidad valida a donar',
        });
      }

      if (this.fundacionesForm.donatePartNum > this.points) {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No tienes suficientes puntos para donar',
        });
      }else{
        console.log('puntos guardados son mayor');
      }
    }


  }

  getPoints(): any {
    this.subscription.push(
       this.usersService.getUser(JSON.parse(localStorage.getItem('user')).userId).subscribe((res) => {
        return this.points = res.points;
      }, (err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.error.message,
        });
      })
    );
  }

}
