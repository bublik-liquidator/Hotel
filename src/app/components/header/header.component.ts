import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { Router } from '@angular/router';
import { UsersData } from '../users-data';
import { AccountComponent } from '../account/account.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedServiceUsers, public matdialog: MatDialog, private router: Router, private cdRef: ChangeDetectorRef) { }
  isEdit: boolean = false;
  isEditAdmin: boolean = false;
  isEditManager: boolean = false;
  buttonInfo: string = " ";
  user: UsersData

  ngOnInit(): void {
    this.GetInfo();
  }

  GetInfo(){
    this.sharedService.getSpecialUser().subscribe((data: any) => {
      this.user = data;
      this.buttonInfo = this.user.vhod
      if (this.user.rol == "admin" && this.buttonInfo == "Выход") {
        this.isEditManager = true;
        this.isEditAdmin = true;
      }
      if (this.user.rol == "manager" && this.buttonInfo == "Выход") {
        this.isEditManager = true;
      }
      if (this.buttonInfo == "Выход") {
        this.isEdit = true;
      }
    });
  }

  Reload() {
    document.location.reload();
  }

  Exit() {
    this.router.navigate(['/']);
    this.isEdit = false;
    this.isEditManager = false;
    this.isEditAdmin = false;
    this.user.vhod = "Вход";
    this.buttonInfo = this.user.vhod
    this.sharedService.putSpecialUser(this.user)
    this.Reload()
  }
  loginBtn() {
    if (this.user.vhod == "Вход") {
      this.matdialog.open(LoginComponent);
    }
    else {
      this.Exit()
    }
  }



}
