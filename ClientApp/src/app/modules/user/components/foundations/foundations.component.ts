import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FoundationsService } from 'src/app/modules/admin/services/foundations.service';
import { DonateService } from '../../services/donate.service';
import { Foundation } from '../../models/Foundations';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { UsersService } from '../../services/users.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsPipe'
})

export class ThousandsPipe implements PipeTransform {

public transform(value: any) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
}
}

@Component({
  selector: 'app-foundations',
  templateUrl: './foundations.component.html',
  styleUrls: ['./foundations.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class FoundationsComponent implements OnInit, OnDestroy {

  foundations: any[] = [];
  foundation: Foundation;
  userId = JSON.parse(localStorage.getItem('user')).userId;
  points: 0;
  environment = environment.IMG_URL;
  private subscription: Subscription[] = [];
  foundationDialog: boolean;
  submitted = false;
  public fundacionesForm = {
    donateAll: false,
    donatePart: false,
    donatePartNum: 20000,
    fundaciones: {
      id: 0,
      name: ''
    }
  };

  constructor(
    private foundationsService: FoundationsService,
    private usersService: UsersService,
    private donateService: DonateService) { }

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
        this.foundations = res.message;
      })
    );
  }

  openNew(): void {
    this.foundation = {
      id: 0,
      name: ''
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
      this.donatePoints(this.points, this.foundation.id);
    }

    if (this.fundacionesForm.donatePart) {
      if (this.fundacionesForm.donatePartNum === 0) {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Por favor digite una cantidad valida a donar',
        });
      }

      if (this.points < 20000) {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Debes donar minimo 20.000 puntos',
        });
      }

      if (this.fundacionesForm.donatePartNum > this.points) {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No tienes suficientes puntos para donar',
        });
      }else{
        this.donatePoints(this.fundacionesForm.donatePartNum, this.foundation.id);
      }
    }


  }

  getPoints(): any {
    this.subscription.push(
       this.usersService.getUser(this.userId).subscribe((res) => {
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

  donatePoints(points: number, foundationId: number): any {
    const data = {
      userId: this.userId,
      points
    };

    this.donateService.donate(foundationId, data).subscribe((res) => {
      if (res) {
        let userStorage = JSON.parse(localStorage.getItem('user'));

        userStorage = {
          token: userStorage.token,
          userId: userStorage.userId,
          userName: userStorage.name,
          userPoints: res.points,
          userImage: userStorage.userImage,
          message: userStorage.message,
          role: userStorage.role
        };

        localStorage.setItem('user', JSON.stringify(userStorage));

        this.usersService.UserPointsService(res.points);
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
    });
  }

}
