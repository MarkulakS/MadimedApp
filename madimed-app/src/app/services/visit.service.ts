import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Visit } from '../models/visit';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVisits(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('Container', container);

    return getPaginatedResult<Visit[]>(this.baseUrl + 'visits', params, this.http);
  }

  getVisitThread(pesel: string) {
    return this.http.get<Visit[]>(this.baseUrl + 'visits/thread/' + pesel);
  }

  addVisit(pesel: string, createDate: Date, createTime: Date, form: string, comments: string) {
    return this.http.post<Visit>(this.baseUrl + 'visits', {doctorPesel: pesel, createDate, createTime, form, comments});
  }

  // addVisit(doctorFirstName: string, doctorLastName: string, createDate: Date, createTime: Date, form: string, comments: string) {
  //   return this.http.post<Visit>(this.baseUrl + 'visits', {doctorFirstName, doctorLastName, createDate, createTime, form, comments});
  // }
}
