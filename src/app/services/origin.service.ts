import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OriginService {
  baseUrl: string;
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/origin';
  }
}
