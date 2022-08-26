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
    return lastValueFrom(
      this.httpClient.get<Wine[]>(this.baseUrl, httpOptions)
    );
  }

  getById(pId: number): Promise<Wine> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    return lastValueFrom(
      this.httpClient.get<Wine>(`${this.baseUrl}/${pId}`, httpOptions)
    );
  }

  getByName(name: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/name/${name}`, httpOptions)
    );
  }
  create(wine: FormData): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    return lastValueFrom(
      this.httpClient.post<any>(this.baseUrl, wine, httpOptions)
    );
  }

}
