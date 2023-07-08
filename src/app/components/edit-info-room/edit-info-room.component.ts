import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';

import { Hotel } from '../hotel';
import { HotelRoom } from '../hotel-room';
import { SharedServiceHotelRoom } from '../SharedServiceHotelRoom';
// FormsModule
@Component({
  selector: 'app-edit-info-room',
  templateUrl: './edit-info-room.component.html',
  styleUrls: ['./edit-info-room.component.css']
})
export class EditInfoRoomComponent implements OnInit {
  constructor(private sharedService: SharedServiceHotelRoom, public matdialog:MatDialog) {}
  
  ngOnInit(): void {
    this.room = this.sharedService.getRoom();
    HotelRoom.copyFieldsValuesTo(this.room, this.editedRoom);
  }

  room = new HotelRoom(); // оригинальная машина
  editedRoom = new HotelRoom(); // это редактируем


  savehotelsToStorage() {
    // if(+this.editedHotel.people <=0||+this.editedHotel.people >400||/[qwertyuiopasdfghjklzxcvbnm]/.test(this.editedHotel.people)||/[йцукенгшщзхъфывапролджэячсмитьбю]/.test(this.editedHotel.people)||this.editedHotel.people==null||this.editedHotel.name==null||this.editedHotel.path_picturs ==null){
    //   alert("Некоректный ввод данны");
    //   return 0;
    //  } 
    // else{
    //console.log(this.hotel instanceof HotelData);
    HotelRoom.copyFieldsValuesTo(this.editedRoom, this.room);
    this.sharedService.initRoom(this.editedRoom);
   // console.log('edited:' + this.editedHotel.name);
    this.sharedService.save(this.room);
    this.matdialog.closeAll();
    return true;
    
  }
  Cancel() {  
     
    this.editedRoom.name = this.room.name;
    this.editedRoom.hotel_id = this.room.hotel_id;
    this.editedRoom.path_picture  = this.room.path_picture ;
    this.matdialog.closeAll();
    //!this.editedHotel= this.hotel;
  }

}
