import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllWinesComponent } from './components/all-wines/all-wines.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormWineComponent } from './components/form-wine/form-wine.component';
import { HomeComponent } from './components/home/home.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { InfoWineComponent } from './components/info-wine/info-wine.component';
import { ListWineComponent } from './components/list-wine/list-wine.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },

  { path: 'home', component: HomeComponent },
  { path: 'newUser', component: FormUserComponent },
  { path: 'updateUser', component: FormUserComponent },
  { path: 'newWine', component: FormWineComponent },
  { path: 'updateWine', component: FormWineComponent },
  { path: 'user', component: InfoUserComponent },
  { path: 'wine/:id', component: InfoWineComponent },
  { path: 'listWine', component: ListWineComponent },
  { path: 'allWines', component: AllWinesComponent },
  { path: 'password/:token', component: NewPasswordComponent },
  { path: 'recoverPassword', component: RecoverPasswordComponent },

  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
