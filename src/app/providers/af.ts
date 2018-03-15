
// src/app/providers/af.ts
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { FirebaseListObservable } from "angularfire2/database-deprecated";




@Injectable()
export class AF {

    private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;
    //'AngularFireList<{}>
    //public messages: Observable<any[]>;
    public messages: Observable<any[]>;
    public messagesRef: AngularFireList<any>;

    public users: any;
    public displayName: string;
    public email: string;
    public index:any;


    constructor(public _firebaseAuth: AngularFireAuth,
        private router: Router,
        private _afDatabase: AngularFireDatabase) {
        this.user = _firebaseAuth.authState;
        this.messagesRef = this._afDatabase.list('/messages');
        this.messages = this.messagesRef.valueChanges();

        this.user.subscribe(
            (user) => {
                if (user) {
                    this.userDetails = user;
                    console.log(this.userDetails);
                }
                else {
                    this.userDetails = null;
                }
            }
        );
    }

    loadMessages() {
        this.messagesRef = this._afDatabase.list('/messages');
        this.messages = this.messagesRef.valueChanges();
    }

    signInWithTwitter() {
        return this._firebaseAuth.auth.signInWithPopup(
            new firebase.auth.TwitterAuthProvider()
        )
    }

    signInWithGoogle() {
        return this._firebaseAuth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
    }

    isLoggedIn() {
        if (this.userDetails == null) {
            return false;
        } else {
            this.messages = this._afDatabase.list('messages').valueChanges();
            return true;
        }
    }

    logout() {
        this._firebaseAuth.auth.signOut()
            .then((res) => this.router.navigate(['login']));
    }

    /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */

    sendMessage(text) {
        var message = {
            message: text,
            displayName: this.displayName,
            email: this.email,
            timestamp: Date.now()
        };

        this.messagesRef.push(message);
    }

    /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
    registerUser(email, password) {
        console.log(email)
        return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    /**
   * Saves information to display to screen when user is logged in
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
    saveUserInfoFromForm(uid, name, email) {
        return this._afDatabase.object('registeredUsers/' + uid).set({
            name: name,
            email: email,
        });
    }

    /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
    loginWithEmail(email, password) {
        return this._firebaseAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
    }

}