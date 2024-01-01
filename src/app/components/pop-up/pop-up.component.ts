import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { HotelData } from '../hotel-data';
import { SharedService } from '../SharedService';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { Hotel } from '../hotel';
import { UsersData } from '../users-data';
// FormsModule
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  constructor(private sharedService: SharedService, public matdialog:MatDialog,private sharedServiceUsers:SharedServiceUsers) {}
  users: UsersData[];
  hotel = new Hotel(); 
  editedHotel = new Hotel();

  ngOnInit(): void {
    this.GetUsers()
    this.hotel = this.sharedService.gethotel();
    Hotel.copyFieldsValuesTo(this.hotel, this.editedHotel);
  }
 

  GetUsers(){
    this.sharedServiceUsers.getAll().subscribe((data: UsersData[]) => {
      this.users = data;
    });
  }

  savehotelsToStorage() {
    Hotel.copyFieldsValuesTo(this.editedHotel, this.hotel);
    this.sharedService.inithotel(this.editedHotel);
   // console.log('edited:' + this.editedHotel.name);
    this.sharedService.save(this.hotel).subscribe( data => console.log( data ) );;
    this.matdialog.closeAll();
    return true;
    
  }
  Cancel() {  
     
    this.editedHotel.name = this.hotel.name;
    this.editedHotel.manager_id = this.hotel.manager_id;
    this.editedHotel.path_picture  = this.hotel.path_picture ;
    this.matdialog.closeAll();
    //!this.editedHotel= this.hotel;
  }

}
