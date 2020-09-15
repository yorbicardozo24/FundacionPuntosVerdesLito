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

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authSvc.isLogged.subscribe( (res) => {
      this.isLogged = res;

      if (this.isLogged) {
        this.router.navigate(['/user']);
      }

    });

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
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
