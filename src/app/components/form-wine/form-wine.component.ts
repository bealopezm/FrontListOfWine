import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  files: any[];
  constructor(
    private wineService: WineService,
    private typeService: TypeService,
    private wineCellarService: WineCellarService,
    private originService: OriginService,
    private router: Router
  ) {
    this.files = [];
    this.types = [];
    this.wineCellars = [];
    this.origins = [];
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      elaborationArea: new FormControl('', [Validators.required]),
      Type_id: new FormControl('', [Validators.required]),
      WineCellar_id: new FormControl('', [Validators.required]),
      Origin_id: new FormControl('', [Validators.required])
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
    const { name, elaborationArea, Origin_id, WineCellar_id, Type_id } = this.form.value;

    const wine = new FormData();
    wine.append('name', name);
    wine.append('elaborationArea', elaborationArea);
    wine.append('photo', this.files[0]);
    wine.append('Origin_id', Origin_id);
    wine.append('WineCellar_id', WineCellar_id);
    wine.append('Type_id', Type_id);

    this.wineService.create(wine)
      .then(response => {
        if (response.message) {
          Swal.fire(response.message)
          this.router.navigate(['/allWines'])
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

  async addWineCellar(form: any) {
    try {
      await this.wineCellarService.create(form.value)
      this.wineCellars = await this.wineCellarService.getAll();
      form.resetForm({})
    } catch (err) {
      console.log(err)
    }

  }

  async addOrigin(form: any) {
    try {
      console.log(form.value)
      await this.originService.create(form.value)
      this.origins = await this.originService.getAll();
      form.resetForm({})
    } catch (err) {
      console.log(err)
    }
  }

  addImage($event: any) {
    this.files = $event.target.files;
  }
}
