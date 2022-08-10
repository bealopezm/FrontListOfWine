import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  baseUrl: string;
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/type';
  }
}
