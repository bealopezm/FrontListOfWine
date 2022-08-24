import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }
  async canActivate(): Promise<boolean> {
    if (localStorage.getItem('token')) {
      const response = await this.userService.getUserLoged();
      if (response.error) {
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
