import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Wine } from 'src/app/interfaces/wine';
import { LoggedUserService } from 'src/app/services/loggedUser.service';
import { UserService } from 'src/app/services/user.service';
import { WineHasUserService } from 'src/app/services/wine-has-user.service';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User | any;
  wines: Wine[];
  form: FormGroup;

  constructor(
    private router: Router,
    private loggedUser: LoggedUserService,
    private userService: UserService,
    private wineService: WineService,
    private wineHasUserService: WineHasUserService
  ) {
    this.wines = []
    this.form = new FormGroup({
      addWine: new FormControl('', [])
    })
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loggedUser.user.subscribe(user => this.user = user)
      const user = await this.userService.getUserLoged();
      this.loggedUser.emitUser(user)
      this.wines = await this.wineService.getAll();
    } catch (err) {
      console.log(err)
    }

  }
  onClickLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.loggedUser.emitUser()
  }

  async onSubmit() {
    try {
      const wine = await this.wineService.getByName(this.form.value.addWine)
      this.wineHasUserService.create({ "Wine_id": wine.id, "User_id": this.user.id })
      this.router.navigate(['/home'])
    } catch (err) {
      console.log(err)
    }
  }
}
