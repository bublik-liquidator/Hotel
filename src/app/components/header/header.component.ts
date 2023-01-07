import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../SharedService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedService, public matdialog:MatDialog) {}

  ngOnInit(): void {
  }
  loginBtn(){
    this.matdialog.open(LoginComponent);
  }
}
