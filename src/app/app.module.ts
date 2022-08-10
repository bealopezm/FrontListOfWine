import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ListWineComponent } from './components/list-wine/list-wine.component';
import { CardWineComponent } from './components/card-wine/card-wine.component';
import { InfoWineComponent } from './components/info-wine/info-wine.component';
import { FormWineComponent } from './components/form-wine/form-wine.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListWineComponent,
    CardWineComponent,
    InfoWineComponent,
    FormWineComponent,
    InfoUserComponent,
    FormUserComponent,
    NewPasswordComponent,
    RecoverPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
