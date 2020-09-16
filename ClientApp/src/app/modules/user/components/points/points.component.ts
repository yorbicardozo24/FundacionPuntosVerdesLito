import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  points = 30;
  newPoints = 15;
  fechaVencimiento = '31 dic 2020';

  constructor() { }

  ngOnInit(): void {
  }

}
