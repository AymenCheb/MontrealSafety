import { Component } from '@angular/core';
import * as L from 'leaflet';
import Report from 'src/app/interfaces/report';
import { HttpClientService } from 'src/app/services/http-client.service';

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
  private reports : Report[] = [];

  public min = 0;
  public max = 2953;

  public jour: boolean = true;
  public soir: boolean = true;
  public nuit: boolean = true;

  public volVehicule: boolean = true;
  public volViolent: boolean = true;
  public meurtre: boolean = true;
  public introduction: boolean = true;
  public mefait: boolean = true;

  private fetchInfos() {
    const quarts: string[] = []
    if (this.soir) quarts.push('soir');
    if (this.jour) quarts.push('jour');
    if (this.nuit) quarts.push('nuit');

    const categories: string[] = []
    if (this.volVehicule) categories.push('volVehicule');
    if (this.volViolent) categories.push('volViolent');
    if (this.meurtre) categories.push('meurtre');
    if (this.introduction) categories.push('introduction');
    if (this.mefait) categories.push('mefait');

    this.httpClientService.getReports(quarts, categories, this.getDayStringFromNumber(this.min), this.getDayStringFromNumber(this.max)).subscribe((data: Report[]) => {
      this.reports = data;
      this.initMap();
    });
  }

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
