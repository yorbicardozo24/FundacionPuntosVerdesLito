import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsersService } from 'src/app/modules/user/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: MenuItem[];

  constructor(public userService: UsersService) { }

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
        label: 'EMPRESAS',
        routerLink: 'users'
      },
      {
        label: 'USUARIOS',
        routerLink: 'admins'
      },
      {
        label: 'HISTORIAL P.D POR EMPRESA',
        routerLink: 'report'
      },
      {
        label: 'HISTORIAL P.D POR ADMIN',
        routerLink: 'history-admin'
      }
    ];
  }

}
