import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/users';
  }

  login(pForm: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, pForm)
    );
  }

  getUserLoged(): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.get<User>(`${this.baseUrl}/userLoged/id`, httpOptions)
    );
    return response
  }
}
