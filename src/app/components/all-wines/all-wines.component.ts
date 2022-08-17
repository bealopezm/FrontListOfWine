import { Component, OnInit } from '@angular/core';
import { Wine } from 'src/app/interfaces/wine';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-all-wines',
  templateUrl: './all-wines.component.html',
  styleUrls: ['./all-wines.component.css']
})
export class AllWinesComponent implements OnInit {

  wines: Wine[];

  constructor(
    private wineService: WineService
  ) {
    this.wines = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.wines = await this.wineService.getAll();
    } catch (err) {
      console.log(err)
    }
  }

}
