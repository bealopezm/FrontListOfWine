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

}
