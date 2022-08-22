import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  type: string = 'New';
  form: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      controlPassword: new FormControl('', []),
    }, [this.passwordValidator])
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      try {
        if (params['id']) {
          const id = parseInt(params['id'])
          this.type = 'Update'
          const user = await this.userService.getById(id);
          this.form = new FormGroup({
            name: new FormControl(user?.name, [
              Validators.required
            ]),
            email: new FormControl(user?.email, [
              Validators.required
            ]),
            id: new FormControl(user?.id, []),
            isActive: new FormControl(user?.isActive, []),
          }, []);
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  async onSubmit() {
    if (this.form.value.id) {
      delete this.form.value.isActive
      this.userService.updateUser(this.form.value)
        .then(response => {
          if (response.message) {
            Swal.fire(response.message)
            this.router.navigate(['/user'])
          }
        })
        .catch(err => console.log(err));
    } else {
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
