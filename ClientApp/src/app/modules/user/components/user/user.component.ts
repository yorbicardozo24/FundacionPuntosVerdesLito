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
  userName: string;

  constructor(private router: Router, public userService: UsersService) { }

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('user')).userName;

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
        label: 'FUNDACIONES',
        routerLink: 'foundations'
      },
      {
        label: 'HISTORIAL',
        routerLink: 'history'
      }
    ];

  }

}
