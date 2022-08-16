import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Type } from '../interfaces/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/type';
  }

  getById(pId: number): Promise<Type> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<Type>(`${this.baseUrl}/${pId}`, httpOptions)
    );
    return response
  }
}
