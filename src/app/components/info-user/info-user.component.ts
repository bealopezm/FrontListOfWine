import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LoggedUserService } from 'src/app/services/loggedUser.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  user: User | any;
  constructor(
    private userService: UserService,
    private loggedUserService: LoggedUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUserLoged()
      .then(response => {
        this.user = response
      })
      .catch(error => console.log(error));
  }

  async deleteUser() {
    try {
      Swal.fire({
        title: `Estas seguro de eliminar tu cuenta`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          this.user.isActive = !this.user.isActive
          this.userService.updateStatus(this.user.id, this.user.isActive)
            .then((response) => {
              Swal.fire(response.message, '', 'success')
            })
            .catch(err => console.log(err));

          localStorage.removeItem('token');
          this.router.navigate(['/home']);
          this.loggedUserService.emitUser()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}
