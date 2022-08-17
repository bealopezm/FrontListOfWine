import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  form: FormGroup;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      password: new FormControl('', [])
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    delete this.form.value.controlPassword
    console.log(this.form.value)
    this.activatedRoute.params.subscribe(params => {
      this.userService.updatePassword(params['token'], this.form.value)
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
    })
  }

}
