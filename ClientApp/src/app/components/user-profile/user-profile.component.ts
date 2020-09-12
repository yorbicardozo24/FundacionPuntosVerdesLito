import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users/users.service';
import { User } from 'src/app/models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    this.usersService.getUser(this.userId).subscribe((res) => {
      if (res){
        this.user.name = res.name;
        this.user.nit = res.nit;
        this.user.email = res.email;
        this.user.departments = res.departments;
        this.user.city = res.city;
        this.user.image = res.image;
        this.user.points = res.points;
      }
    }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err,
        });
      }
    );
  }

}
