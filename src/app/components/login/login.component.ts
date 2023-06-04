import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private sharedService: SharedServiceUsers, private header: HeaderComponent, public matdialog: MatDialog, private _router: Router
  ) { }

  informationError: string = 'Войдите в систему, пожалуйста)';
  user = new UsersData();
  test:UsersData;
  users: UsersData[] = [];
  isEdit: boolean;
  @Output() onChanged = new EventEmitter<boolean>();
 
  change(increased:any) {
      this.onChanged.emit(increased);
  }

  ngOnInit(): void {
    // this.users = this.sharedService.getAll();
   
    
    this.GetUsers();
    this.isEdit= JSON.parse(localStorage.getItem('Esidit') || '[]');
    
  }

  GetUsers() {
    this.sharedService.getAll().subscribe((data: any) => {
      this.users = data;
    });
  }

  Loginnn(user: UsersData) {
    //this.log = this.users[0].login
    console.log(this.users.find(({ login }) => login == user.login));
    if (this.users.find(({ login }) => login === user.login)) {
      if (this.users.find(({ password }) => password === user.password)) {
        //this.sharedService.session(userLogin);       
       
        if(this.users.find(({ login }) => login === user.login)!==undefined){
          const foundUser = this.users.find(({ login }) => login === user.login);
          if (foundUser) {
            this.user = foundUser;
          }
        }
        if(user.rol=="admin"){
          localStorage.setItem('isEditAdmin', JSON.stringify(true));
        }
        //localStorage.setItem('Activleusers', JSON.stringify(user.id));      

        //this.header.ChekButton();
        this.isEdit = !this.isEdit;
        //localStorage.setItem('Esidit', JSON.stringify(this.isEdit));    
        this.change(true)
    
        //как вариант см нижеthis.sharedService.initUser(user);
        this.sharedService.PUTBYID(this.user)
        console.log("ПРОВЕРКА "+ this.user.id)

        this.sharedService.initChekButton(true);
        //localStorage.setItem('Activleusers', JSON.stringify(user.id))
        /////////////////////////localStorage.setItem('Activleusers', JSON.stringify(user));

        //////////////////////////////////////////this.sharedService.inituser(user);
        this.matdialog.closeAll();
        this._router.navigate(['/account']);
        this.header.buttonInfo=this.sharedService.getChekButton();
       //console.log("CHEC "+ this.header.buttonInfo)
        //console.log("this.sharedService.getChekButton() "+ this.sharedService.getChekButton())


      }
    }

    if ((user.password == '' && user.login == '') || (user.password != '' && user.login != '')) {
      this.informationError = 'Некорректный Password и Login';
    }
    if (user.login == '' && user.password != '') {
      this.informationError = 'Некорректный Login';
    }
    if (user.password == '' && user.login != '') {
      this.informationError = 'Некорректный Password';
    }
  }
  Registration() {
    this.matdialog.closeAll();
    this.matdialog.open(RegistrationComponent);//   this._router.navigate(['/registration']);

  }
}
