import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  items: MenuItem[];
  isLogged = false;

  private subscription: Subscription = new Subscription();
  private destroy$ = new Subject<any>();

  constructor(public authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'INICIO',
          url: 'https://www.fundacionpuntosverdes.com/'
      },
      {
          label: 'CONÓCENOS',
          url: 'https://www.fundacionpuntosverdes.com/conocenos/'
      },
      {
        label: 'PUNTOS DE RECOLECCIÓN',
        url: 'https://www.fundacionpuntosverdes.com/puntos-de-recoleccion/'
      },
      {
        label: 'CAUSAS SOCIALES',
        url: 'https://www.fundacionpuntosverdes.com/causas-sociales/'
      },
      {
        label: 'BLOG',
        url: 'https://www.fundacionpuntosverdes.com/blog/'
      },
      {
        label: 'VOLUNTARIADO',
        url: 'https://www.fundacionpuntosverdes.com/voluntariado/'
      }
    ];

    this.subscription.add(
      this.authSvc.isLogged.subscribe( (res) => (this.isLogged = res))
    );


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout(): void {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

}
