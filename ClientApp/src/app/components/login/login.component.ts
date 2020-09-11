import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    const userData = {
      email: 'yorbicardozo@gmaiil.comm',
      password: '12345'
    };

    this.authSvc.login(userData).subscribe((res) => console.log('Login', res));
  }

}
