import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  isLogged = false;

  constructor(public authSvc: AuthService, private router: Router) { }

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

    this.authSvc.isLogged.subscribe( (res) => (this.isLogged = res));

  }

  onLogout(): void {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

}
