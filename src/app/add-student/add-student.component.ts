import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from "@angular/router";

import { FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms'; // Importing Reactive Form related classes.
import { CustomValidators } from './validators/custom-validators';
import * as firebase from 'firebase/app';
import { AF } from "../providers/af";


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  public myForm: FormGroup;

  rForm: FormGroup;

  private selectedClass: any = {};

  constructor(private router: Router, private route: ActivatedRoute, public afService: AF) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'firstName': new FormControl('Dileep kumar', Validators.required),
      'lastName': new FormControl('Kottakota', Validators.required),
      'fatherName': new FormControl('Koteswara Rao', Validators.required),
      'DateOfBirth': new FormControl('10/06/1992', Validators.required),
      'email': new FormControl('kottakotadileepkumar@gmail.com', Validators.required),
      'rollNo': new FormControl('1', Validators.required),
      'address': new FormControl('k kavity', Validators.required),
      'city': new FormControl('Veeraghattam', Validators.required),
      'state': new FormControl('AP', Validators.required),
      'postalcode': new FormControl('532460', Validators.required),
      'phoneNumber': new FormControl('9493702550', Validators.required)
    });

    this.route.params.subscribe(params => {
      this.selectedClass = JSON.parse(params["class"]);
      this.index = params["index"];
    });

  }

  index: any
  buildPhoneNumberComponent() {
    return new FormControl('', [Validators.required, CustomValidators.telephoneNumber]);
  }

  backClickHandler() {
    this.router.navigate(['classdetails', { class: JSON.stringify(this.selectedClass) }]);
  }

  printMyForm() {
    console.log(this.myForm);
  }

  register(myForm: NgForm) {
    var students: any = [];
    if (this.selectedClass["students"] != null && this.selectedClass["students"].length > 0) {
      students = this.selectedClass["students"];
    }
    else {
      this.selectedClass = Object.assign({}, this.selectedClass);
      this.selectedClass["students"] = [];
    }
    students.push(myForm.value);
    this.selectedClass["students"] = students;
    firebase.database().ref().child('/classdetails/classes/' + this.index).update(this.selectedClass);
  }

  updateStudent() {
    
  }
}
