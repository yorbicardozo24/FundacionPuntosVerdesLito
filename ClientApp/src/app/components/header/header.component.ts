import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'INICIO',
      },
      {
          label: 'CONÓCENOS',
          // icon: 'pi pi-fw pi-pencil',
          // items: [
          //     {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          //     {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          // ]
      },
      {
        label: 'PUNTOS DE RECOLECCIÓN',
      },
      {
        label: 'FUNDACIONES',
      },
      {
        label: 'VOLUNTARIADO',
      },
      {
        label: 'MI PERFIL',
      }
    ];
  }

}
