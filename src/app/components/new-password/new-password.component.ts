import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
      password: new FormControl('', [
        Validators.minLength(4)
      ]),
      controlPassword: new FormControl('', []),
    }, [this.passwordValidator])
  }

  ngOnInit(): void {
  }
  passwordValidator(form: AbstractControl) {
    const passwordValue = form.get('password')?.value
    const confirmPasswordValue = form.get('controlPassword')?.value

    if (passwordValue !== confirmPasswordValue) {
      return { passwordvalidator: true }
    }
    return null
  }
  onSubmit() {
    delete this.form.value.controlPassword
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

  checkControl(controlName: string, errorName: string): boolean {
    if (this.form.get(controlName)?.hasError(errorName) && this.form.get(controlName)?.touched) {
      return true;
    } else {
      return false;
    }
  }

}
