import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: MenuItem[];
  title = 'FundacionPuntosVerdesLito';

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'MI PERFIL',
        routerLink: 'profile'
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
