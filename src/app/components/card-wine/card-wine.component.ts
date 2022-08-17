import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Origin } from 'src/app/interfaces/origin';
import { Type } from 'src/app/interfaces/type';
import { Wine } from 'src/app/interfaces/wine';
import { WineCellar } from 'src/app/interfaces/wine-cellar';
import { WineHasUser } from 'src/app/interfaces/wine-has-user';
import { WineHasUserService } from 'src/app/services/wine-has-user.service';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-card-wine',
  templateUrl: './card-wine.component.html',
  styleUrls: ['./card-wine.component.css']
})
export class CardWineComponent implements OnInit {

  @Input() miWine: WineHasUser | any;
  @Output() deleteId: EventEmitter<number>;
  wine: Wine | any;
  favorite: string;
  taste: string;

  constructor(
    private wineService: WineService,
    private wineHasUserService: WineHasUserService
  ) {
    this.taste = '';
    this.favorite = '';
    this.deleteId = new EventEmitter();
  }

  async ngOnInit(): Promise<void> {
    try {
      if (this.miWine.favorite === undefined) {
        this.wine = await this.wineService.getById(this.miWine.id)
      } else {
        this.wine = await this.wineService.getById(this.miWine.Wine_id)
        this.icontaste();
        this.iconFavorite();
      }
    } catch (err) {
      console.log(err)
    }
  }

  async isTasted() {
    try {
      this.miWine.taste = !this.miWine.taste
      await this.wineHasUserService.updateTaste(this.miWine.taste, this.miWine.id)
      this.miWine = await this.wineHasUserService.getById(this.miWine.id)
      this.icontaste();
    } catch (err) {
      console.log(err)
    }

  }

  async isFavorite() {
    try {
      this.miWine.favorite = !this.miWine.favorite
      await this.wineHasUserService.updateFavorite(this.miWine.favorite, this.miWine.id)
      this.miWine = await this.wineHasUserService.getById(this.miWine.id)
      //console.log(this.miWine)
      this.iconFavorite();
    } catch (err) {
      console.log(err)
    }
  }

  async delete() {
    return this.deleteId.emit(this.miWine.id)
  }

  icontaste() {
    return this.taste = this.miWine.taste ? 'bi bi-check-lg' : 'bi bi-x'
  }

  iconFavorite() {
    return this.favorite = this.miWine.favorite ? 'bi-heart-fill' : 'bi-heart'
  }

}
