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
  fecha = new Date();
  year = this.fecha.getFullYear();
  fechaVencimiento = `31 dic ${this.year}`;

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
  }

}
