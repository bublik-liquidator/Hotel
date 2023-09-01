
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
import { EditRoomComponent } from '../edit-room/edit-room.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
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
  EditRoom(hotel: Hotel) {
    localStorage.setItem('hotel', JSON.stringify(hotel));
    this.router.navigate(['/EditRoomComponent']);

  }
  AddButtonhotel() {
    this.isEdit = !this.isEdit;
  }

  Addhotel(newHotel:any) {
    if(newHotel.name==undefined){
      this.sharedServiceInfo.initErrorInformation("Вы не ввели имя отеля")
      this.matdialog.open(ShowInfoComponent);
    }
    else{
      if(newHotel.manager_id==undefined){
        this.sharedServiceInfo.initErrorInformation("Вы не ввели manager_id")
        this.matdialog.open(ShowInfoComponent);
      }
      else{
        
        {
          newHotel.path_picture="{"+newHotel.path_picture+"}"
          this.sharedService.create(newHotel).subscribe(() => {
            this.GetHotel();
            this.newHotel=new Hotel();
          });
                
        }
      }
    }
  

  this.GetHotel();
  }

  deletehotel(id: bigint) {
    this.sharedService.delete(id).subscribe(() => {
      this.GetHotel();
    });
  }

}
