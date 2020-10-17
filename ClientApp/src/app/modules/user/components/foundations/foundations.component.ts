import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foundations',
  templateUrl: './foundations.component.html',
  styleUrls: ['./foundations.component.css'],
})
export class FoundationsComponent implements OnInit {

  csiframe = false;
  odsiframe = false;
  geoiframe = false;

  constructor() { }

  ngOnInit(): void {}

  csIframe(): void {
    this.odsiframe = false;
    this.geoiframe = false;
    this.csiframe = true;
  }

  odsIframe(): void {
    this.csiframe = false;
    this.geoiframe = false;
    this.odsiframe = true;
  }

  geoIframe(): void {
    this.csiframe = false;
    this.odsiframe = false;
    this.geoiframe = true;
  }

}
