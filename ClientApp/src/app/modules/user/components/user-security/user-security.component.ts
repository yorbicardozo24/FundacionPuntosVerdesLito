import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.css']
})
export class UserSecurityComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  userId = JSON.parse(localStorage.getItem('user')).userId;

  public userData = {
    oldpassword: '',
    newPassword: '',
    repeatPassword: ''
  };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  saveUserData(): any {
    if (this.userData.oldpassword.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Contraseña actual es requerida',
      });
    }
    if (this.userData.newPassword.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Nueva contraseña es requerida',
      });
    }
    if (this.userData.repeatPassword.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Confirmar contraseña es requerida',
      });
    }

    if (this.userData.newPassword === this.userData.repeatPassword) {
      this.subscription.push(
        this.usersService.changePasswordUser(this.userId, this.userData).subscribe((res) => {
          if (res) {
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
    }else{
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Las contraseñas no coiciden',
      });
    }

  }

}
