
// src/app/login-page/login-page.component.ts
import { Component } from '@angular/core';
import { AF } from "../providers/af";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AngularFireDatabase } from 'angularfire2/database'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public error: any;
  public success: any;

  constructor(public afService: AF, private router: Router, public _afDatabase: AngularFireDatabase, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.success = params['success'];
      });
  }

  loginWithGoogle() {
    this.afService.signInWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in
      this.afService.displayName = data.user.displayName;
      this.afService.email = data.user.email;
      this.afService.loadMessages();

      this.router.navigate(['']);
    })
  }

  loginWithEmail(event, email, password) {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then((data) => {
      this.afService.displayName = data.user.displayName;
      this.afService.email = data.user.email;
      this.router.navigate(['']);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }
}

