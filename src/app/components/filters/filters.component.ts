import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Origin } from 'src/app/interfaces/origin';
import { WineCellar } from 'src/app/interfaces/wine-cellar';
import { Type } from 'src/app/interfaces/type';
import { OriginService } from 'src/app/services/origin.service';
import { TypeService } from 'src/app/services/type.service';
import { WineCellarService } from 'src/app/services/wine-cellar.service';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filters: FormGroup
  types: Type[];
  wineCellars: WineCellar[];
  origins: Origin[];

  constructor(
    private wineService: WineService,
    private typeService: TypeService,
    private wineCellarService: WineCellarService,
    private originService: OriginService,
  ) {
    this.types = [];
    this.wineCellars = [];
    this.origins = [];
    this.filters = new FormGroup({}, [])
  }

  async ngOnInit(): Promise<void> {
    try {
      this.types = await this.typeService.getAll();
      this.wineCellars = await this.wineCellarService.getAll();
      this.origins = await this.originService.getAll();
    } catch (err) {
      console.log(err)
    }
  }


  getFilters() {

  }
}
