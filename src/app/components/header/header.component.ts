import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SharedServiceUsers } from '../SharedServiceUsers';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedServiceUsers, public matdialog:MatDialog) {}
  isEdit: boolean;
  buttonInfo: string=" " ;

  ngOnInit(): void {
   this.isEdit =JSON.parse(localStorage.getItem('Esidit') || '[]');
   this.sharedService.initChekButton(this.isEdit);    
   this.buttonInfo = this.sharedService.getChekButton();  
  }

  loginBtn(){ 
    this.isEdit = !this.isEdit;
    localStorage.setItem('Esidit', JSON.stringify( this.isEdit));  
    this.sharedService.initChekButton(this.isEdit);    
    this.matdialog.open(LoginComponent);
  }



  ChekButton(){ 
   
    this.buttonInfo=this.sharedService.getChekButton();

    this.buttonInfo = JSON.parse(localStorage.getItem('vhod') || '[]');
    console.log("this.buttonInfo"+ this.buttonInfo);
    location.reload();
  //location.reload();
    //window.location.reload();
    //this._router.navigate(['/account']);
    //this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => { this._router.navigate(['/account']); });
    // <ng-container *ngIf="!rerender">
    // <ng-container *ngIf="!rerender">

  }
 
}
