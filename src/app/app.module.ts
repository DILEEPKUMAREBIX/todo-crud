
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

import { RouterModule, Routes } from "@angular/router";

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AF } from './providers/af';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';


// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyCCVQRdNjlSEpfgk6koD-LU-lVNcPK5bg4',
  authDomain: 'fir-crud-dil.firebaseapp.com',
  databaseURL: 'https://fir-crud-dil.firebaseio.com',
  storageBucket: 'fir-crud-dil.appspot.com',
  messagingSenderId: '777843154072'
};

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],

  providers: [AF],
  declarations: [AppComponent, LoginPageComponent, HomePageComponent, RegistrationPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

