import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerForm = this.fb.group({
    nombre: [''],
    email: [''],
    password: [''],
    departments: [''],
    nit: [''],
    tel: [''],
    repeatPassword: [''],
    city: [''],
    rut: [''],
    terms: ['']
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

  onRegister(): void {
    console.log('register');
  }

}
