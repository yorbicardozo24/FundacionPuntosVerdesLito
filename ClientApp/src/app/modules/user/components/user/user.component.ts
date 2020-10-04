import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  items: MenuItem[];
  userName = JSON.parse(localStorage.getItem('user')).userName;

  constructor(private router: Router, public userService: UsersService) { }

  ngOnInit(): void {

    this.items = [
      {
        label: 'MI PERFIL',
        routerLink: 'profile',
      },
      {
        label: 'SEGURIDAD',
        routerLink: 'security'
      },
      {
        label: 'CAUSAS SOCIALES',
        routerLink: 'foundations'
      },
      {
        label: 'HISTORIAL DONADO',
        routerLink: 'history'
      }
    ];

  }

}
