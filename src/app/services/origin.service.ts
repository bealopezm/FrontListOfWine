import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Origin } from '../interfaces/origin';

@Injectable({
  providedIn: 'root'
})
export class OriginService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/origin';
  }

  getAll(): Promise<Origin[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<Origin[]>(`${this.baseUrl}`, httpOptions)
    );
    return response
  }

  getById(pId: number): Promise<Origin> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<Origin>(`${this.baseUrl}/${pId}`, httpOptions)
    );
    return response
  }

  create(pForm: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}`, pForm, httpOptions)
    );
    return response
  }
}
