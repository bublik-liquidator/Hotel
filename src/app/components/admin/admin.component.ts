
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HotelData } from '../hotel-data';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { SharedService } from '../SharedService';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hotel } from '../hotel';
import { ShowInfoComponent } from '../show-info/show-info.component';
import { SharedServiceShowInfo } from '../SharedServiceShowInfo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  hotels: Hotel[] = [];
  newHotel = new Hotel();
  isEdit: boolean = false;

  person: { id: string; age?: number };
  constructor(private sharedServiceInfo: SharedServiceShowInfo,private matdialog: MatDialog, private sharedService: SharedService, private http: HttpClient, private router: Router) {
  }

  isResultLoaded = false;
  StudentArray: string[] = [];

  ngOnInit(): void {
    this.GetHotel(); 
    //  this.hotels=this.sharedService.getAll();
  }

  GetHotel() {
    this.sharedService.getAll().subscribe((data: any) => {
      this.hotels = data;
    });
  }

  Edithotel(hotel: Hotel) {
    this.matdialog.open(PopUpComponent);
    this.sharedService.inithotel(hotel);
  }

  AddButtonhotel() {
    this.isEdit = !this.isEdit;
  }

  Addhotel(newHotel:any) {
    if(newHotel.name==undefined){
      this.sharedServiceInfo.initErrorInformation("Вы не ввели имя юзера")
      this.matdialog.open(ShowInfoComponent);
    }
    else{
      if(newHotel.manager_id==undefined){
        this.sharedServiceInfo.initErrorInformation("Вы не ввели manager_id")
        this.matdialog.open(ShowInfoComponent);
      }
      else{
        if(newHotel.path_picture==undefined){
          this.sharedServiceInfo.initErrorInformation("Вы не ввели path_picture")
          this.matdialog.open(ShowInfoComponent);
        }
        else{

          //this.sharedService.create(newHotel);
          window.location.reload();

        }
      }
    }
  

  this.GetHotel();
  }

  deletehotel(id: bigint) {
    this.sharedService.delete(id);
    this.ngOnInit();
    window.location.reload();

    this.GetHotel();
  }


}
