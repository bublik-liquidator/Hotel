import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Contacts',
  templateUrl: './Contacts.component.html',
  styleUrls: ['./Contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor() { }
  cat: boolean = false;
  ngOnInit(): void {
  }
  ChecCat(){
    this.cat=!this.cat;
    console.log(this.cat)
  }

}
