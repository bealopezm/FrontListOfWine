import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  user: User | any;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserLoged()
      .then(response => {
        this.user = response
      })
      .catch(error => console.log(error));
  }

  deleteUser() {

  }
}
