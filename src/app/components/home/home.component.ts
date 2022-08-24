import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LoggedUserService } from 'src/app/services/loggedUser.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() setUser!: (user: User) => void;
  form: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private loggedUser: LoggedUserService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    }, [])
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.getUserLoged()
        .then(response => {
          this.router.navigate(['/listWine']);
        })
        .catch(error => console.log(error));
    }
  }

  async onSubmit() {
    try {
      const response = await this.userService.login(this.form.value)
      if (response.token !== "") {
        localStorage.setItem('token', response.token);
        const user = await this.userService.getUserLoged()
        this.loggedUser.emitUser(user)
        this.router.navigate(['/listWine']);
      }
      if (response.err) {
        Swal.fire(
          'Oops...',
          response.err,
          'error'
        )
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
      }
    } catch (err) {
      console.log(err)
    }
  }
}
