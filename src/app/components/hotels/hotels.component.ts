import { Component, OnInit } from '@angular/core';
import { SharedService } from '../SharedService';
import { UsersData } from '../users-data';
import { Hotel } from '../hotel';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component( {
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: [ './hotels.component.css' ]
} )
export class HotelsComponent implements OnInit {


  isEdit: boolean = false;
  isEditNomer: boolean = true;
  deistveSnomerom: string = "Book";
  hotels: Hotel[] = [];

  constructor(  private sharedService: SharedService, public matdialog: MatDialog, private router: Router ) { }
  user: UsersData
  checkLogin: boolean;
  Data: object;

  ngOnInit(): void {
    this.GetHotel();
    this.deistveSnomerom = "Go to ";
  }


  GetHotel() {
    this.sharedService.getAll().subscribe( ( data: any ) => {
      this.hotels = data;
    } );
  }


  toBook( hotel: Hotel ) {
    localStorage.setItem( 'hotel', JSON.stringify( hotel ) );
    this.router.navigate( [ '/room' ] );
  }



}

