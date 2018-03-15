import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AF } from "../../providers/af";




@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

  public selected: any;
  public selectedClass: any;
  public panelOpenState: boolean = true;
  public classes: any = [];
  public isEditAction: boolean = false;

  displayedColumns = ['rollno', 'fullname', 'atdp', 'marksp', "dob"];
  dataSource: MatTableDataSource<StudentData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _afDatabase: AngularFireDatabase,
    private router: Router,
    public afService: AF,
    private route: ActivatedRoute, ) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this._afDatabase.list('/classdetails/classes').valueChanges().subscribe(
      classes => {
        this.classes = classes;
      })

    this.route.params.subscribe(params => {
      if (params && (Object.keys(params).length === 0)) {

      }
      else {
        this.selectedClass = JSON.parse(params["class"]);
        this.selected = this.selectedClass.id;
        this.buildDataTable();
      }
    });
  }

  createNewStudent(student: any): StudentData {
    return {
      rollno: student.rollNo,
      fullname: student.firstName + " " + student.lastName,
      atdp: "100",
      marksp: "100",
      dob: student.DateOfBirth
    };
  }

  index: any;
  changed(selected) {
    this.selectedClass = this.classes.filter(x => x.id === selected)[0];
    this.index = this.classes.indexOf(this.selectedClass);
    this.selectedClass["classTeacher"] != null ? this.selectedClass["classTeacher"] : "";
    this.selectedClass["classCR"] != null ? this.selectedClass["classCR"] : "";
    this.buildDataTable();
  }

  buildDataTable() {
    const users: StudentData[] = [];
    for (let i = 0; this.selectedClass.students != undefined && i < this.selectedClass.students.length; i++) {
      if (this.selectedClass.students[i] != null) {
        users.push(this.createNewStudent(this.selectedClass.students[i]));
      }
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  saveClassData(id: any) {
    this.selectedClass["classTeacher"] = this.selectedClass.classTeacher;
    this.selectedClass["classCR"] = this.selectedClass.classCR;

    firebase.database().ref().child('/classdetails/classes/' + this.index).update(this.selectedClass);
    this.isEditAction = false;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addStudent() {
    this.afService.index = this.index;
    this.router.navigate(['/addstudent', { class: JSON.stringify(this.selectedClass), index: this.index }]);
  }
}


export interface StudentData {
  rollno: string;
  fullname: string;
  atdp: string;
  marksp: string;
  dob: string;
}