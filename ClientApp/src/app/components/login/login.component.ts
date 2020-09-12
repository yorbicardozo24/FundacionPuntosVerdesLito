import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  onLogin(): void {
    const formValue = this.loginForm.value;
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
    });

  }

}
