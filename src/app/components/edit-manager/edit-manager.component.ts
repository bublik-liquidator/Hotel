import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { SharedService } from '../SharedService';
import { Hotel } from '../hotel';
@Component({
  selector: 'app-edit-manager',
  templateUrl: './edit-manager.component.html',
  styleUrls: ['./edit-manager.component.css']
})
export class EditManagerComponent implements OnInit {
  user = new UsersData(); 
  edituser = new UsersData(); 
  users: UsersData[] = [];
  isEdit: boolean = false;
  hotelID:number;
  hotels: Hotel[] = [];


  constructor(private sharedService: SharedServiceUsers, public matdialog:MatDialog,private sharedServiceHotel: SharedService) {}

  ngOnInit(): void {
    this.user = this.sharedService.getuser();
    UsersData.copyFieldsValuesTo(this.user, this.edituser);
    this.getHotels()
  }
  
  getHotels(){
    this.sharedServiceHotel.getAll().subscribe(
      data => {
        this.hotels = data;
      },
      error => {
        console.error('Error getting hotels', error);
      }
    );
  }
  savehotelsToStorage() {
    if (!this.edituser.username || !this.edituser.login) {
      alert("Incorrect data");
      return;
    }
  
    UsersData.copyFieldsValuesTo(this.edituser, this.user);
    this.sharedService.inituser(this.edituser);
  
    this.sharedService.saveInfoUser(this.user, this.hotelID).then(
      data => {
        console.log(data);
        this.matdialog.closeAll();
      }
    ).catch(
      error => {
        console.error('Error updating user info or hotel manager', error);
      }
    );
  }

  Cancel() {    
    this.edituser.username = this.user.username;
    this.edituser.login = this.user.login;
    this.edituser.photo  = this.user.photo ;
    this.matdialog.closeAll();
  }

}

