import { Component, OnDestroy, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  user: User = {
    name: '',
    nit: '',
    email: '',
    password: '',
    image: '',
    points: 0,
    departments: '',
    city: '',
    role: '',
  };

  userId = localStorage.getItem('userId');
  spinner: boolean;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    this.spinner = false;

    // setTimeout( () => {
    this.subscription.add(
      this.usersService.getUser(this.userId).subscribe((res) => {
        if (res){
          this.user.name = res.name;
          this.user.nit = res.nit;
          this.user.email = res.email;
          this.user.departments = res.departments;
          this.user.city = res.city;
          this.user.image = res.image;
          this.user.points = res.points;
          this.spinner = false;
        }
      }, (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err,
          });
        }
      )
    );
    // }, 3000);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
