import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-foundation-profile',
  templateUrl: './foundation-profile.component.html',
  styleUrls: ['./foundation-profile.component.css']
})
export class FoundationProfileComponent implements OnInit {

  userPoints = JSON.parse(localStorage.getItem('user')).userPoints;
  items: [any];
  fecha = new Date();
  year = this.fecha.getFullYear();
  fechaVencimiento = `31 dic ${this.year}`;

  constructor(
    public userService: UsersService,
    public authSvc: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.items = [
      {
        items: [
          {label: 'Mi perfil', img: '../../../assets/img/icon-profile.svg', routerLink: 'profile'},
          {label: 'Mis puntos', img: '../../../assets/img/icon-points.svg', routerLink: 'points'}
        ]
      }
    ];

  }

  onLogout(): void {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

}
