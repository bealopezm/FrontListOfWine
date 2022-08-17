import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wine } from 'src/app/interfaces/wine';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-info-wine',
  templateUrl: './info-wine.component.html',
  styleUrls: ['./info-wine.component.css']
})
export class InfoWineComponent implements OnInit {

  wine: Wine | any;
  constructor(
    private wineService: WineService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params) => {
      this.wineService.getById(params['id'])
        .then(response => {
          this.wine = response
        })
        .catch(error => console.log(error));

    })
  }

}
