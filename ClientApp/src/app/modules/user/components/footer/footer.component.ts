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
          {label: 'Inicio', url: 'https://www.fundacionpuntosverdes.com/'},
          {label: 'Conócenos', url: 'https://www.fundacionpuntosverdes.com/conocenos/'},
          {label: 'Puntos de recolección', url: 'https://www.fundacionpuntosverdes.com/puntos-de-recoleccion/'},
          {label: 'Blog', url: 'https://www.fundacionpuntosverdes.com/blog/'}
        ]
      },
      {
        items: [
          {label: 'Voluntariado', url: 'https://www.fundacionpuntosverdes.com/voluntariado/'},
          {label: 'Inicia sesión', url: 'https://www.fundacionpuntosverdes.com/app/'}
        ]
      },
      {
        items: [
          {label: 'Soy fundación', url: 'https://www.fundacionpuntosverdes.com/soy-fundacion/'},
          {label: 'Solicitar mi recolección', url: 'https://www.fundacionpuntosverdes.com/contacto/'},
          {label: 'Descargar certificados', url: 'http://extranet.lito.com.co/GLitoApp/Login/Login'},
          {label: 'Preguntas frecuentes', url: 'https://www.fundacionpuntosverdes.com/preguntas/'},
          {label: 'Contacto', url: 'https://www.fundacionpuntosverdes.com/contacto/'}
        ]
      },
    ];
  }

}
