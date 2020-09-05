import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foundation-profile',
  templateUrl: './foundation-profile.component.html',
  styleUrls: ['./foundation-profile.component.css']
})
export class FoundationProfileComponent implements OnInit {
  items: [any];
  // constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        items: [
          {label: 'Mi perfil', img: '../../assets/img/icon-profile.svg', routerLink: 'profile'},
          {label: 'Mis puntos', img: '../../assets/img/icon-points.svg', routerLink: 'points'},
          {label: 'Cerrar sesión', img: '../../assets/img/icon-logout.svg', routerLink: 'logout'}
        ]
      }
    ];

}
}
