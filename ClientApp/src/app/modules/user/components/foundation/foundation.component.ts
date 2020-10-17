import { Component, OnInit, OnDestroy } from '@angular/core';
import { Foundation } from '../../models/Foundations';
import { DonateService } from '../../services/donate.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { FoundationsService } from 'src/app/modules/admin/services/foundations.service';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'thousandsPipe'
})

export class ThousandsPipe implements PipeTransform {
  public transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.css']
})
export class FoundationComponent implements OnInit, OnDestroy {

  userId = JSON.parse(localStorage.getItem('user')).userId;
  private subscription: Subscription[] = [];
  points: 0;
  title = '';
  description = '';
  public fundacionesForm = {
    donateAll: false,
    donatePart: false,
    donatePartNum: 20000,
  };

  constructor(
    private foundationsService: FoundationsService,
    private usersService: UsersService,
    private donateService: DonateService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPoints();
    this.getFoundation(this.route.snapshot.paramMap.get('id'));
  }

  getFoundation(id): void {
    this.subscription.push(
      this.foundationsService.getFoundation(id).subscribe((res) => {
        this.title = res.message[0].name;
        this.description = res.message[0].description;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  saveDonation(): any {
    if (!this.fundacionesForm.donateAll && !this.fundacionesForm.donatePart) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Por favor seleccione una opción de donación',
      });
    }

    if (this.fundacionesForm.donateAll) {
      this.donatePoints(this.points);
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
        this.donatePoints(this.fundacionesForm.donatePartNum);
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

  donatePoints(points: number): any {
    const data = {
      userId: this.userId,
      points
    };

    this.donateService.donate(this.route.snapshot.paramMap.get('id'), data).subscribe((res) => {
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
