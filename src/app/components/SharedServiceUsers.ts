import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { UsersData } from './users-data';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable()
export class SharedServiceUsers {
  user = new UsersData();
  users: UsersData[] = [];
  ChekButton: string;
  editeduser = new UsersData();
  constructor(private http: HttpClient, private router: Router) {
  }
  inituser(user: UsersData) {
    this.user = user;
  }
  getuser(): UsersData {
    return this.user;
  }
  edituser(user: UsersData) {
    UsersData.copyFieldsValuesTo(user, this.user);
  }

  //{ getAll(): Observable<userData[]> {
  //   return async function getData(this: any) {
  //     this.http.get('http://localhost:3000/user').subscribe((data: Object) => {
  //       this.users = data as userData[];
  //       console.log(this.users);
  //     });
  //   }
  // } }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3003/user');
  }
  getById(id: string) {
    return this.http.get(`http://localhost:3003/user/${id}`);
  }

  create(user: UsersData) {
    this.http.post('http://localhost:3003/user', user).subscribe((user: Object) => {
      console.log(user);
    });

  }

  save(user: UsersData) {
    return this.http.put('http://localhost:3003/user/' + user.id, user).subscribe(data=>console.log(data));
  }
  delete(id: bigint) {
    this.http.delete('http://localhost:3003/user/' + id).subscribe((data: Object) => {
      console.log(data);
    });
  }

  session(sesiy: any) {
    localStorage.setItem('session', JSON.stringify(sesiy));
  }
  initChekButton(isEdit: boolean) {
    if (isEdit == false) {
      this.ChekButton = "Вход";
      localStorage.setItem('vhod', JSON.stringify(this.ChekButton));  

    }
    if (isEdit == true) {
      this.ChekButton = "Выход";
      localStorage.setItem('vhod', JSON.stringify(this.ChekButton));  

      
    }
   
  }
  getChekButton() {  
    return this.ChekButton;
  }

}
