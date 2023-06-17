import { Component, OnInit } from '@angular/core';
import { SharedService } from '../SharedService';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { Hotel } from '../hotel';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {


  isEdit: boolean = false;
  isEditNomer: boolean = true;
  deistveSnomerom: string = "Забронировать";
  hotels: Hotel[] = [];

  newHotel = new Hotel();
  constructor(private sharedServiceUsers: SharedServiceUsers, private sharedService: SharedService,public matdialog: MatDialog,private router: Router) { }
  user: UsersData
  checkLogin: boolean;
  Data: object;

  ngOnInit(): void {   
    this.GetHotel();
    this.deistveSnomerom = "Перейти к";    
  }


  GetHotel() {
    this.sharedService.getAll().subscribe((data: any) => {
      this.hotels = data;
      this.newHotel = this.hotels[0];
    });
  }

  hotelselect(hotelName: string) {
    for (let i = 0; i < this.hotels.length; i++) {
      if (hotelName == this.hotels[i].name) {
        this.newHotel = this.hotels[i];
        // this.http.get(this.newHotel.path_json).subscribe({ next: (data: any) => this.user = new User(data.specification) });

      }
    }

  }
  toBook(hotel: Hotel) {
      localStorage.setItem('hotel', JSON.stringify(hotel));
      this.router.navigate(['/room']);  
  }

 

}

