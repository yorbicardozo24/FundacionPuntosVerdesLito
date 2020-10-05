import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FoundationsService } from 'src/app/modules/admin/services/foundations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  isLogged = false;
  sendPoints = false;
  forgetPassword = false;
  pointsEmail: string;
  passwordEmail: string;
  isAdmin = false;
  isUser = false;

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private foundationService: FoundationsService
  ) { }

  ngOnInit(): void {

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

  onLogin(): void {
    const formValue = this.loginForm.value;

    this.subscription.push(
      this.authSvc.login(formValue).subscribe( (res) => {
        if (res) {
          this.navigateAdmin();
          this.navigateUser();
        }
      }, (err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err,
        });
      })
    );

  }

  sendPointsService(): any {
    if (this.pointsEmail === undefined){
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Digita un email',
      });
    }else{
      if (this.pointsEmail.trim() === '') {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Digita un email',
        });
      }
    }
    this.subscription.push(
      this.foundationService.sendPoints(this.pointsEmail).subscribe((res) => {
        return Swal.fire({
          icon: 'success',
          title: 'Bien hecho!',
          text: res.message,
        });
      }, (err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err,
        });
      })
    );
  }

}
