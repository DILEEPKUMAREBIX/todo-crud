
// src/app/registration-page/registration-page.component.ts
import { Component } from '@angular/core';
import { AF } from "../providers/af";
import { Router } from "@angular/router";
@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  public error: any;
  constructor(private afService: AF, private router: Router) { }
  //registers the user and logs them in
  register(event, name, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email).then((data) => {
        this.router.navigate(['/login'], { queryParams: { success: "Successfully registered" }});
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }
}

