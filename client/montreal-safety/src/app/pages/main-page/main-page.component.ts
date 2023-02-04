import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import Report from 'src/app/interfaces/report';

var greenIcon = new L.Icon({
  iconUrl: '../../../assets/leaf-green.png',
  shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  options: {
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
 }
});


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  private map : L.Map;
  private reports : Report[] = [
    {
      lat: 45.56778,
      long: -73.626778,
      quart: '',
      category: '',
      date: '2022-02-02'
    },
    {
      lat: 45.519122,
      long: -73.685928,
      quart: '',
      category: '',
      date: '2022-02-02'
    },
    {
      lat: 45.516776,
      long: -73.591457,
      quart: '',
      category: '',
      date: '2022-02-02'
    },
    {
      lat: 45.602873,
      long: -73.635117,
      quart: '',
      category: '',
      date: '2022-02-02'
    },
  ];

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.55, -73.68 ],
      zoom: 11
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 11,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.reports.forEach((report: Report) => {
      L.marker([report.lat, report.long], {icon: greenIcon}).addTo(this.map);
    })

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
