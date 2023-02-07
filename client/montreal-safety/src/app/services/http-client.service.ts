import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Report from 'src/app/interfaces/report';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private baseUrl: string;
  private errorMessage: string;
  constructor(protected readonly http: HttpClient) {
    this.baseUrl = 'https://montrealmischief-spriouocsq-uc.a.run.app/api';
    this.errorMessage = '';
  }

  getReports(
    quarts: string[],
    categories: string[],
    beginningDate?: string,
    endDate?: string
  ): Observable<string[]> {
    let requestUrl = `${this.baseUrl}/reports?quarts${
      quarts.length > 0 ? '=' + JSON.stringify(quarts) : ''
    }&categories${
      categories.length > 0 ? '=' + JSON.stringify(categories) : ''
    }&beginning_date${beginningDate ? '=' + beginningDate : ''}&end_date${
      endDate ? '=' + endDate : ''
    }`;

    console.info(requestUrl);

    return this.http.get<string[]>(requestUrl);
  }
}
