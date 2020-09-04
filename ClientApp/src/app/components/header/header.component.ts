import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

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
