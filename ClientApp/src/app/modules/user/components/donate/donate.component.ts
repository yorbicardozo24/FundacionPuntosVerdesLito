import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  fundaciones: any[];
  public fundacionesForm = {
    donateAll: false,
    donatePart: false,
    donatePartNum: 0,
    fundaciones: {
      code: 0,
      name: ''
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  donate(): any {
    console.log('donate');
  }

}
