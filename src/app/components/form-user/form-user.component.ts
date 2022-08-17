import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  form: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl('', {}),
      email: new FormControl('', {}),
      password: new FormControl('', {}),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    delete this.form.value.controlPassword
    this.userService.register(this.form.value)
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
