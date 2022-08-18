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

  recoverPassword(pForm: any): Promise<any> {
    const response = lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/recoverPassword`, pForm)
    );
    return response
  }

  updatePassword(pToken: any, pForm: any): Promise<any> {
    const response = lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/password/${pToken}`, pForm)
    );
    return response
  }
  register(pForm: User): Promise<any> {
    const response = lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, pForm)
    );
    return response
  }

  updateStatus(pId: number, pIsActive: boolean): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
    const response = lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/status/${pId}`, { isActive: pIsActive }, httpOptions)
    );
    return response
  }

  getByEmail(pEmail: any): Promise<any> {
    const response = lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/email/${pEmail}`)
    );
    return response
  }

  updateByEmail(pForm: any, pIsActive: boolean): Promise<any> {
    const response = lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/recoverUser`, { ...pForm, isActive: pIsActive })
    );
    return response
  }
}
