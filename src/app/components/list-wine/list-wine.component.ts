import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { WineHasUser } from 'src/app/interfaces/wine-has-user';
import { UserService } from 'src/app/services/user.service';
import { WineHasUserService } from 'src/app/services/wine-has-user.service';

@Component({
  selector: 'app-list-wine',
  templateUrl: './list-wine.component.html',
  styleUrls: ['./list-wine.component.css']
})
export class ListWineComponent implements OnInit {

  wines: WineHasUser[];
  user: User | any;
  deleteId: number | any;

  constructor(
    private wineHasUserService: WineHasUserService,
    private userService: UserService

  ) {
    this.wines = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.userService.getUserLoged();
      this.wines = await this.wineHasUserService.listWineUser(this.user.id)
    } catch (err) {
      console.log(err)
    }

  }

  async deleteWineHasUser($event: number) {
    try {
      await this.wineHasUserService.delete($event)
      this.wines = await this.wineHasUserService.listWineUser(this.user.id)
    } catch (err) {
      console.log(err)
    }
  }


}
