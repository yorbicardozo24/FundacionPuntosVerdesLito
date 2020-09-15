import { Component, OnDestroy, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { UserData } from '../../models/User';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  userId = JSON.parse(localStorage.getItem('user')).userId;
  spinner: boolean;

  user: UserData = {
    name: '',
    nit: '',
    email: '',
    departments: '',
    city: ''
  };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    this.subscription.add(
      this.usersService.getUser(this.userId).subscribe((res) => {
        if (res){
          this.user = {
            name: res.name,
            nit: res.nit,
            email: res.email,
            departments: res.departments,
            city: res.city
          };
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

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
