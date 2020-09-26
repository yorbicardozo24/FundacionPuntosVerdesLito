import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { UploadService } from '../../services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foundation-profile',
  templateUrl: './foundation-profile.component.html',
  styleUrls: ['./foundation-profile.component.css']
})
export class FoundationProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  userId = JSON.parse(localStorage.getItem('user')).userId;
  src = '../../assets/img/img-profile.svg';

  constructor(
    public userService: UsersService,
    public authSvc: AuthService,
    private router: Router,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe((res) => {
      if (res) {
        if (res.image !== '') {
          this.src = res.image;
        }
      }
    });
  }

  onLogout(): void {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  uploader(e: any): any {
    const target = e.target.files;

    if (target.length > 1) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No se puede enviar multiples archivos',
      });
    }

    const formData = new FormData();
    formData.append('file', target[0], target[0].name);

    this.subscription.push(
      this.uploadService.updateImage(this.userId, formData).subscribe((res) => {
        if (res) {
          this.src = res.message;
        }
      }, (err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.error.message,
        });
      })
    );

  }

}
