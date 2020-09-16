import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
  isAdmin = false;
  isUser = false;

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.subscription.push(
      this.authSvc.isLogged.subscribe( (res) => {
        this.isLogged = res;

        this.navigate();

      })
    );

   }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  navigate(): void{

    this.subscription.push(
      this.authSvc.isAdmin.subscribe((res) => {
        this.isAdmin = res;
        if(this.isLogged && this.isAdmin) {
          this.router.navigate(['/admin']);
        }
      })
    );
    this.subscription.push(
      this.authSvc.isUser.subscribe((res) => {
        this.isUser = res;
        if (this.isLogged && this.isUser) {
          this.router.navigate(['/user']);
        }
      })
    );
  }

  onLogin(): void {
    const formValue = this.loginForm.value;

    this.subscription.push(
      this.authSvc.login(formValue).subscribe( (res) => {
        if (res) {
          this.router.navigate(['/user']);
        }
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err,
        });
      })
    );

  }

}
