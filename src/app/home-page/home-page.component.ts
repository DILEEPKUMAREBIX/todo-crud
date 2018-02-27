// src/app/home-page/home-page.component.ts
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AF } from "../providers/af";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public newMessage: string;
  public messages: Observable<any[]>;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(public afService: AF) {
    
    this.messages = this.afService.messages;

  }

  ngOnInit() { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { console.log('Scroll to bottom failed yo!') }
  }

  // I forgot to add this but thanks for letting me know in the comments so I could update it!
  sendMessage() {
    this.afService.sendMessage(this.newMessage);
    this.newMessage = '';
  }


  isYou(email) {
    if (email == this.afService.email)
      return true;
    else
      return false;
  }

  isMe(email) {
    if (email == this.afService.email)
      return false;
    else
      return true;
  }
}