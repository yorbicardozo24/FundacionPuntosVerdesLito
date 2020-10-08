import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
  selector: 'app-code-random',
  templateUrl: './code-random.component.html',
  styleUrls: ['./code-random.component.css']
})
export class CodeRandomComponent implements OnInit, OnDestroy {

  codigo: number;
  @Input() email: string;
  private subscription: Subscription[] = [];
  isLogged = false;
  isAdmin = false;
  isUser = false;
  password = '';
  repeatPassword = '';
  codeSent: boolean;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private forgetPassword: ForgetPasswordService
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.authSvc.isLogged.subscribe( (res) => {
        this.isLogged = res;
        this.navigateAdmin();
        this.navigateUser();
      })
    );
    this.codeSent = false;
  }

  sendCode(): any {
    if (this.codigo > 0) {
      this.subscription.push(
        this.forgetPassword.sendCode(this.codigo, this.email).subscribe((res) => {
          this.codeSent = true;
        })
      );
    } else {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Por favor ingrese su código',
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  sendNewPassword(): any {
    if (this.password.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Por favor ingrese su nueva contraseña',
      });
    }
    if (this.repeatPassword.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Por favor repita su nueva contraseña',
      });
    }

    this.subscription.push(
      this.forgetPassword.sendNewPassword(this.email, this.codigo, this.password).subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Bien hecho!',
          text: res.message,
        });
        this.router.navigate(['/login']);
      }, (err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.error.message,
        });
      })
    );
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

}
