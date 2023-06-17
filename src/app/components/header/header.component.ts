import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { Router } from '@angular/router';
import { UsersData } from '../users-data';


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
  authorizationButtonText: string = " ";
  loggedInButtonText: string = "Выход";
  notLoggedInButtonText: string = "Вход";
  user: UsersData
  Data: object;
  hotelLink:string;
  roomLink :string;


  ngOnInit(): void {
    this.checLogin();

  }


  checLogin() {
    this.Data = JSON.parse(localStorage.getItem('activleUser') || '[]');
    if (localStorage.getItem('activleUser') == null) {      
      this.userLoggedOut();
    }
    if (localStorage.getItem('activleUser') != null) {
      this.isEdit=true;

      this.userLoggedIn();
    }
    
  }


  ButtonText() {
    if (localStorage.getItem('activleUser') == null) {
      this.matdialog.open(LoginComponent);
    }
    else {
      this.router.navigate(['/']);
      localStorage.removeItem('activleUser');
      localStorage.removeItem('room');
      localStorage.removeItem('hotel');
      this.checLogin();
      setTimeout(() => {
        document.location.reload();
      }, 500); // Вызов метода через 2 секунды
     

    }
  }

  userLoggedIn() {
    this.authorizationButtonText = this.loggedInButtonText;
    // console.log("loggedIn");
  }

  userLoggedOut() {    
    this.authorizationButtonText = this.notLoggedInButtonText;
    // console.log("loggedOut");

  }



  // this.isEdit = false;
  // this.isEditManager = false;
  // this.isEditAdmin = false;
  // //this.user.vhod = "Вход";
  // changeButton(button: { innerText: string; }) {
  //   if (localStorage.getItem('activleUser') != null) {
  //     button.innerText = "ВЫХОД2";
  //   }
  //   else {
  //     button.innerText = "ВХОД2";
  //   }
  // }


}
