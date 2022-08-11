import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  private emitChanges = new BehaviorSubject<User | any>({})
  user = this.emitChanges.asObservable()

  constructor() { }

  emitUser(user?: User): void {
    this.emitChanges.next(user || {})
  }
}
