import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
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
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      controlPassword: new FormControl('', []),
    }, [this.passwordValidator])
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    delete this.form.value.controlPassword
    try {
      const user = await this.userService.getByEmail(this.form.value.email)

      if (!user) {
        const response = await this.userService.register(this.form.value)
        this.message(response);
      }

      if (user && user.isActive === 0) {
        user.isActive = !user.isActive
        const response = await this.userService.updateByEmail(this.form.value, user.isActive)
        this.message(response);
      }

    } catch (err) { console.log(err) }

  }

  passwordValidator(form: AbstractControl) {
    const passwordValue = form.get('password')?.value
    const confirmPasswordValue = form.get('controlPassword')?.value
    if (passwordValue !== confirmPasswordValue) {
      return { passwordvalidator: true }
    }
    return null
  }

  message(response: any) {
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
  }
}
