import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Wine } from '../interfaces/wine';
import { WineHasUser } from '../interfaces/wine-has-user';

@Injectable({
  providedIn: 'root'
})
export class WineHasUserService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/wineHasUser';
  }

  listWineUser(pId: number): Promise<WineHasUser[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<WineHasUser[]>(`${this.baseUrl}/user/${pId}`, httpOptions)
    );
    return response
  }
  updateTaste(ptaste: boolean, pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/taste/${pId}`, { taste: ptaste }, httpOptions)
    );
    return response
  }

  updateFavorite(pfavorite: boolean, pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/favorite/${pId}`, { favorite: pfavorite }, httpOptions)
    );
    return response
  }

  getById(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pId}`, httpOptions)
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

  delete(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/${pId}`, httpOptions)
    );
    return response
  }
}
