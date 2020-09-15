import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foundation-profile',
  templateUrl: './foundation-profile.component.html',
  styleUrls: ['./foundation-profile.component.css']
})
export class FoundationProfileComponent implements OnInit {

  items: [any];
  userName: string;
  userPoints: string;

  constructor() { }

  ngOnInit(): void {

    this.userName = JSON.parse(localStorage.getItem('user')).userName;
    this.userPoints = JSON.parse(localStorage.getItem('user')).userPoints;

    this.items = [
      {
        items: [
          {label: 'Mi perfil', img: '../../../assets/img/icon-profile.svg', routerLink: 'profile'},
          {label: 'Mis puntos', img: '../../../assets/img/icon-points.svg', routerLink: 'points'},
          {label: 'Cerrar sesión', img: '../../../assets/img/icon-logout.svg', routerLink: 'logout'}
        ]
      }
    ];

  }
}
