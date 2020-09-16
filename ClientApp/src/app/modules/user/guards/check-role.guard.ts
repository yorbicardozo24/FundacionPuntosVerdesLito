import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRoleGuard implements CanActivate {

  constructor(private authSvc: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authSvc.isUser.pipe(
      take(1),
      map((isUser: boolean) => isUser)
    );
  }

}
