import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/user';
  }
}
