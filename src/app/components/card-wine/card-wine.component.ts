import { Component, Input, OnInit } from '@angular/core';
import { Origin } from 'src/app/interfaces/origin';
import { Type } from 'src/app/interfaces/type';
import { Wine } from 'src/app/interfaces/wine';
import { WineCellar } from 'src/app/interfaces/wine-cellar';
import { WineHasUser } from 'src/app/interfaces/wine-has-user';
import { OriginService } from 'src/app/services/origin.service';
import { TypeService } from 'src/app/services/type.service';
import { WineCellarService } from 'src/app/services/wine-cellar.service';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-card-wine',
  templateUrl: './card-wine.component.html',
  styleUrls: ['./card-wine.component.css']
})
export class CardWineComponent implements OnInit {

  @Input() miWine: WineHasUser | any;
  wine: Wine | any;
  origin: Origin | any;
  type: Type | any;
  wineCellar: WineCellar | any;
  favorite: string;
  tasted: string;

  constructor(
    private wineService: WineService,
    private originService: OriginService,
    private typeService: TypeService,
    private wineCellarService: WineCellarService
  ) {
    this.tasted = '';
    this.favorite = '';
  }

  async ngOnInit(): Promise<void> {
    try {
      console.log(this.miWine)
      this.wine = await this.wineService.getById(this.miWine.Wine_id)
      console.log(this.wine)
      this.origin = await this.originService.getById(this.wine.Origin_id)
      console.log(this.origin)
      this.type = await this.typeService.getById(this.wine.Type_id)
      console.log(this.type)
      this.wineCellar = await this.wineCellarService.getById(this.wine.WineCellar_id)
      console.log(this.wineCellar)

      this.tasted = this.miWine.tasted ? 'bi bi-check-lg' : 'bi bi-x'
      console.log(typeof (this.miWine.tasted))
      this.favorite = this.miWine.favorite ? 'bi-heart-fill' : 'bi-heart'
      console.log(this.favorite)

    } catch (err) {
      console.log(err)
    }
  }

}
