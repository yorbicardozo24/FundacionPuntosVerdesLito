import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users/users.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      res => {
        this.users = res.users;
      },
      err => console.log(err)
    );
  }

}
