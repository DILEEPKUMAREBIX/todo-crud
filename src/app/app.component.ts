
// src/app/app.component.ts
import { Component } from '@angular/core';
import { AF } from "./providers/af";
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;
  constructor(public afService: AF, private router: Router) {
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.


    if (this.afService.isLoggedIn()) {
      console.log("Successfully Logged in.");
      this.isLoggedIn = true;
      // UPDATE: I forgot this at first. Without it when a user is logged in and goes directly to /login
      // the user did not get redirected to the home page.
      this.router.navigate(['']);
    }
    else {
      console.log("Not Logged in.");
      this.router.navigate(['login']);
      this.isLoggedIn = false;
    }

    this.router.navigate(['classdetails']);
  }
  logout() {
    this.afService.logout();
    //this.router.navigate(['login']);
  }
}

