import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-foundation-profile',
  templateUrl: './foundation-profile.component.html',
  styleUrls: ['./foundation-profile.component.css']
})
export class FoundationProfileComponent implements OnInit {

  constructor(
    public userService: UsersService,
    public authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onLogout(): void {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

}
