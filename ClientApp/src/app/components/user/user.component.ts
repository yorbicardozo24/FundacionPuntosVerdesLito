import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  items: MenuItem[];

  constructor(private router: Router) { }

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
