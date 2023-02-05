import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Report from 'src/app/interfaces/report';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string;
  private errorMessage: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:5000/api';
    this.errorMessage = '';
  }

  getReports(
    quarts: string[],
    categories: string[],
    beginningDate?: string,
    endDate?: string
  ): Observable<Report[]> {
    let requestUrl = `${this.baseUrl}/reports?quart${
      quarts.length > 0 ? '=' + JSON.stringify(quarts) : ''
    }&category${
      categories.length > 0 ? '=' + JSON.stringify(categories) : ''
    }&beginning_date${beginningDate ? '=' + beginningDate : ''}&end_date${
      endDate ? '=' + endDate : ''
    }`;

    console.info(requestUrl);

    return this.http.get<Report[]>(requestUrl);
  }
}
