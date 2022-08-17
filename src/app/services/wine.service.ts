import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Wine } from '../interfaces/wine';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/wine';
  }

  getAll(): Promise<Wine[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<Wine[]>(`${this.baseUrl}`, httpOptions)
    );
    return response
  }

  getById(pId: number): Promise<Wine> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<Wine>(`${this.baseUrl}/${pId}`, httpOptions)
    );
    return response
  }

  getByName(name: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/name/${name}`, httpOptions)
    );
    return response
  }
  create(pForm: Wine): Promise<any> {
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
