import { Component } from '@angular/core';
import * as L from 'leaflet';
import Report from 'src/app/interfaces/report';
import { HttpClientService } from 'src/app/services/http-client.service';

var icon1 = new L.Icon({
  iconUrl: '../../../assets/pin1.png',
  options: {
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
 }
});

var icon2 = new L.Icon({
  iconUrl: '../../../assets/pin2.png',
  options: {
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
 }
});

var icon3 = new L.Icon({
  iconUrl: '../../../assets/pin3.png',
  options: {
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
 }
});

var icon4 = new L.Icon({
  iconUrl: '../../../assets/pin4.png',
  options: {
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
 }
});

var icon5 = new L.Icon({
  iconUrl: '../../../assets/pin5.png',
  options: {
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
 }
});

var icon6 = new L.Icon({
  iconUrl: '../../../assets/pin6.png',
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
  private reports : Report[] = [];

  public min = 2936;
  public max = 2953;

  public jour: boolean = true;
  public soir: boolean = true;
  public nuit: boolean = true;

  public volVehicule: boolean = true;
  public volDansVehicule: boolean = true;
  public volViolent: boolean = true;
  public meurtre: boolean = true;
  public introduction: boolean = true;
  public mefait: boolean = true;

  fetchInfos() {
    const quarts: string[] = [];
    if (this.soir) quarts.push('soir');
    if (this.jour) quarts.push('jour');
    if (this.nuit) quarts.push('nuit');

    const categories: string[] = [];
    if (this.volVehicule) categories.push('volVehicule');
    if (this.volDansVehicule) categories.push('VolDansVehicule');
    if (this.volViolent) categories.push('volViolent');
    if (this.meurtre) categories.push('meurtre');
    if (this.introduction) categories.push('introduction');
    if (this.mefait) categories.push('mefait');

    this.reports = []
    this.httpClientService.getReports(quarts, categories, this.getDayStringFromNumber(this.min), this.getDayStringFromNumber(this.max)).subscribe(async (data: any) => {

      await data.reports.forEach(async (row: any) => {
        const reportObj = await JSON.parse(row);
        this.reports.push({lat: reportObj.LATITUDE, long: reportObj.LONGITUDE, category: reportObj.CATEGORIE, quart: reportObj.QUART, date: reportObj.DATE })
      })

      this.initMap();
    });

    this.initMap();
  }

  private initMap(): void {

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 11,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.map?.remove();
    this.map = L.map('map', {
      center: [ 45.55, -73.68 ],
      zoom: 11,
    });

    this.reports.forEach((report: Report) => {
      if (report.category === "Vol de véhicule à moteur") L.marker([report.lat, report.long], {icon: icon1}).addTo(this.map);
      if (report.category === "Vols qualifiés") L.marker([report.lat, report.long], {icon: icon2}).addTo(this.map);
      if (report.category === "Infractions entrainant la mort") L.marker([report.lat, report.long], {icon: icon3}).addTo(this.map);
      if (report.category === "Introduction") L.marker([report.lat, report.long], {icon: icon4}).addTo(this.map);
      if (report.category === "Méfait") L.marker([report.lat, report.long], {icon: icon5}).addTo(this.map);
      if (report.category === "Vol dans / sur véhicule à moteur") L.marker([report.lat, report.long], {icon: icon6}).addTo(this.map);

    })



    tiles.addTo(this.map);
  }

  getDayFromNumber(day: number) {
    const min = new Date('2015-01-02')
    min.setDate(min.getDate() + day);
    return min.toLocaleDateString('en-UK', {day: '2-digit', month: '2-digit', year: 'numeric'});
  }

  getDayStringFromNumber(day: number) {
    const min = new Date('2015-01-02')
    min.setDate(min.getDate() + day);
    return min.toLocaleDateString('fr-CA');
  }

  constructor(private readonly httpClientService: HttpClientService) { }

  ngAfterViewInit(): void {
    this.fetchInfos();
  }
}
