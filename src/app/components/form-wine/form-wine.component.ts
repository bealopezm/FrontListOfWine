import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Origin } from 'src/app/interfaces/origin';
import { Type } from 'src/app/interfaces/type';
import { WineCellar } from 'src/app/interfaces/wine-cellar';
import { OriginService } from 'src/app/services/origin.service';
import { TypeService } from 'src/app/services/type.service';
import { WineCellarService } from 'src/app/services/wine-cellar.service';
import { WineService } from 'src/app/services/wine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-wine',
  templateUrl: './form-wine.component.html',
  styleUrls: ['./form-wine.component.css']
})
export class FormWineComponent implements OnInit {

  form: FormGroup;
  types: Type[];
  wineCellars: WineCellar[];
  origins: Origin[];
  constructor(
    private wineService: WineService,
    private typeService: TypeService,
    private wineCellarService: WineCellarService,
    private originService: OriginService,
    private router: Router
  ) {
    this.types = [];
    this.wineCellars = [];
    this.origins = [];
    this.form = new FormGroup({
      name: new FormControl('', []),
      photo: new FormControl('', []),
      elaborationArea: new FormControl('', []),
      Type_id: new FormControl('', []),
      WineCellar_id: new FormControl('', []),
      Origin_id: new FormControl('', [])
    })
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

  onSubmit() {
    const wine = {
      name: this.form.value.name,
      elaborationArea: this.form.value.elaborationArea,
      photo: this.form.value.photo,
      Origin_id: parseInt(this.form.value.Origin_id),
      WineCellar_id: parseInt(this.form.value.WineCellar_id),
      Type_id: parseInt(this.form.value.Type_id)
    }
    this.wineService.create(wine)
      .then(response => {
        if (response.message) {
          Swal.fire(response.message)
          this.router.navigate(['/home'])
        } else {
          Swal.fire(
            'Oops...',
            response.err,
            'error'
          )
        }
      })
      .catch(error => console.log(error));
  }
}
