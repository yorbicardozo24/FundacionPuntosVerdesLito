import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  email: string;
  emailEnviado: boolean;
  isLogged = false;
  isAdmin = false;
  isUser = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private forgetPassword: ForgetPasswordService
  ) { }

  ngOnInit(): void {
    this.emailEnviado = false;
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

  sendEmail(): any {
    if (this.email.trim() === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Digita un email',
      });
    }
    this.subscription.push(
      this.forgetPassword.sendEmail(this.email).subscribe((res) => {
        this.emailEnviado = true;
        return Swal.fire({
          icon: 'success',
          title: 'Bien hecho!',
          text: res.message,
        });
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
