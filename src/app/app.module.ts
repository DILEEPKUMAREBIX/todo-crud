
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms'

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AF } from './providers/af';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ClassDetailsComponent } from './student-details/class-details/class-details.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ShowErrorsComponent } from './add-student/show-error.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';






// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyCl9ABgYBRDFELSX006AwQ_WBMWtf4CkTQ',
  authDomain: 'wechatkkt.firebaseapp.com',
  databaseURL: 'https://wechatkkt.firebaseio.com',
  storageBucket: 'wechatkkt.appspot.com',
  messagingSenderId: '316454207417'
};

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'classdetails', component: ClassDetailsComponent },
  { path: 'addstudent', component: AddStudentComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),

    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ],

  providers: [AF],
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    RegistrationPageComponent,
    ClassDetailsComponent,
    AddStudentComponent,
    ShowErrorsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

