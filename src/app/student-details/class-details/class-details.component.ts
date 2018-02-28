import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

  selected: any;
  panelOpenState: boolean = true;
  //classList:any = ["6th class", "7th class","8th class","9th class","10th class"]
  public classes:any = [];
  constructor(private _afDatabase: AngularFireDatabase) {

  }

  ngOnInit() {
    this._afDatabase.list('/classdetails/classes').valueChanges().subscribe(
      classes => {
        this.classes = classes;
        alert(this.classes);
      })
  }

}
