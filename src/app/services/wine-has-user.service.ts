import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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
}
