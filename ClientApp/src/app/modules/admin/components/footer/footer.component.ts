import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number;
  items: MenuItem[];

  constructor() {
    this.year = new Date().getFullYear();
   }

  ngOnInit(): void {
    this.items = [
      {
        items: [
          {label: 'Inicio'},
          {label: 'Conócenos'},
          {label: 'Recolección'},
          {label: 'Blog'}
        ]
      },
      {
        items: [
          {label: 'Voluntariado'},
          {label: 'Inicia sesión'}
        ]
      },
      {
        items: [
          {label: 'Soy fundación'},
          {label: 'Solicitar mi recolección'},
          {label: 'Descargar certificados'},
          {label: 'Preguntas frecuentes'}
        ]
      },
    ];
  }

}
