import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private loggedUser: LoggedUserService
  ) { }

  ngOnInit(): void {
  }
  onClickLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.loggedUser.emitUser()
  }

}
