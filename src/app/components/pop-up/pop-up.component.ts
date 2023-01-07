import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { CarData } from '../car-data';
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
    this.car = this.sharedService.getCar();
    CarData.copyFieldsValuesTo(this.car, this.editedCar);
  }

  car = new CarData(); // оригинальная машина
  editedCar = new CarData(); // это редактируем


  saveCarsToStorage() {
    if(+this.editedCar.speed <=0||+this.editedCar.speed >400||/[qwertyuiopasdfghjklzxcvbnm]/.test(this.editedCar.speed)||/[йцукенгшщзхъфывапролджэячсмитьбю]/.test(this.editedCar.speed)||this.editedCar.speed==null||this.editedCar.name==null||this.editedCar.path_picturs==null){
      alert("Некоректный ввод данны");
      return 0;
     } 
     else{
    console.log(this.car instanceof CarData);
    CarData.copyFieldsValuesTo(this.editedCar, this.car);
    this.sharedService.initCar(this.editedCar);
    console.log('edited:' + this.editedCar.name);
    this.sharedService.save();
    this.matdialog.closeAll();
    return true;
    }
  }
  Cancel() {    
    this.editedCar.name = this.car.name;
    this.editedCar.speed = this.car.speed;
    this.editedCar.path_picturs = this.car.path_picturs;
    this.matdialog.closeAll();
    //!this.editedCar= this.car;
  }

}
