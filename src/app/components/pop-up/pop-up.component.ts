import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { HotelData } from '../hotel-data';
import { SharedService } from '../SharedService';
// FormsModule
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  constructor(private sharedService: SharedService, public matdialog:MatDialog) {}
  
  ngOnInit(): void {
    this.hotel = this.sharedService.gethotel();
    HotelData.copyFieldsValuesTo(this.hotel, this.editedHotel);
  }

  hotel = new HotelData(); // оригинальная машина
  editedHotel = new HotelData(); // это редактируем


  savehotelsToStorage() {
    if(+this.editedHotel.people <=0||+this.editedHotel.people >400||/[qwertyuiopasdfghjklzxcvbnm]/.test(this.editedHotel.people)||/[йцукенгшщзхъфывапролджэячсмитьбю]/.test(this.editedHotel.people)||this.editedHotel.people==null||this.editedHotel.name==null||this.editedHotel.path_picturs ==null){
      alert("Некоректный ввод данны");
      return 0;
     } 
     else{
    console.log(this.hotel instanceof HotelData);
    HotelData.copyFieldsValuesTo(this.editedHotel, this.hotel);
    this.sharedService.inithotel(this.editedHotel);
    console.log('edited:' + this.editedHotel.name);
    this.sharedService.save(this.hotel);
    this.matdialog.closeAll();
    return true;
    }
  }
  Cancel() {    
    this.editedHotel.name = this.hotel.name;
    this.editedHotel.people = this.hotel.people;
    this.editedHotel.path_picturs  = this.hotel.path_picturs ;
    this.matdialog.closeAll();
    //!this.editedHotel= this.hotel;
  }

}
