import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedServiceUsers, public matdialog: MatDialog,private router: Router) { }
  isEdit: boolean;
  isEditAdmin: boolean=false;
  buttonInfo: string = " ";

  ngOnInit(): void {
    
    this.isEdit=JSON.parse(localStorage.getItem('Esidit') || '[]');
    this.sharedService.initChekButton(this.isEdit);
    this.buttonInfo = this.sharedService.getChekButton();
    this.isEditAdmin =  JSON.parse(localStorage.getItem('isEditAdmin') || '[]');
  }

  
  log(){
    this.matdialog.open(LoginComponent);

  }

  Exit(){
    this.router.navigate(['/']);
    this.isEdit = true;
  }
  loginBtn() {
    if (this.isEdit == false) {
      localStorage.setItem('Esidit', JSON.stringify(this.isEdit));
      this.sharedService.initChekButton(this.isEdit);
      this.matdialog.open(LoginComponent);
      this.router.navigate(['/account']);

    }
    else {
      console.log("ВЫХОД");
      this.isEdit = !this.isEdit;
      this.isEditAdmin = false;
      this.router.navigate(['/']);

      
    //

      localStorage.setItem('Esidit', JSON.stringify(this.isEdit));
      localStorage.setItem('Activleusers', JSON.stringify(""));
      localStorage.setItem('isEditAdmin', JSON.stringify(""));

      this.sharedService.initChekButton(this.isEdit);
      this.buttonInfo = this.sharedService.getChekButton();

    }
  }




  ChekButton() {

    this.buttonInfo = this.sharedService.getChekButton();

    //this.buttonInfo = JSON.parse(localStorage.getItem('vhod') || '[]');
    console.log("this.buttonInfo" + this.buttonInfo);
    location.reload();

    //location.reload();
    //window.location.reload();
    //this._router.navigate(['/account']);
    //this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => { this._router.navigate(['/account']); });
    // <ng-container *ngIf="!rerender">
    // <ng-container *ngIf="!rerender">

  }

}
