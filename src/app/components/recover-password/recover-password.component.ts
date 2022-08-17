import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  form: FormGroup;
  constructor(
    private userService: UserService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [])
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.form.value)
    this.userService.recoverPassword(this.form.value)
      .then(response => {
        if (response.message) {
          Swal.fire(response.message)
        } else {
          Swal.fire(
            'Oops...',
            response.err,
            'error'
          )
        }
      })
      .catch(err => {
        console.log(err)
      });
  }
}
