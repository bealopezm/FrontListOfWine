import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { WineCellar } from '../interfaces/wine-cellar';

@Injectable({
  providedIn: 'root'
})
export class WineCellarService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/wineCellar';
  }

  getById(pId: number): Promise<WineCellar> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<WineCellar>(`${this.baseUrl}/${pId}`, httpOptions)
    );
    return response
  }
}
