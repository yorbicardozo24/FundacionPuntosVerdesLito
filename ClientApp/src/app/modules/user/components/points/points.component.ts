import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  points = 30;
  newPoints = 15;
  fechaVencimiento = '31 dic 2020';

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
  }

}
