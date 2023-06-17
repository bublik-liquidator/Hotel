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
  getSpecialUser(){
    return this.http.get(`http://localhost:3003/useriid/`);
  }
  putTokenUser(user: UsersData){
    return this.http.post('http://localhost:3000/api/login', user).subscribe((data: Object) => {
      localStorage.setItem('activleUser', JSON.stringify(data));
    });
  }
  putUser(user: UsersData){
    return this.http.post('http://localhost:3000/api/user', user).subscribe((data: Object) => {
      localStorage.setItem('activleUser', JSON.stringify(data));
    });
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3003/user');
  }
  getById(id: bigint):Observable<UsersData>{
       return this.http.get<UsersData>(`http://localhost:3003/user/${id}`);
}

  create(user: UsersData) {
    this.http.post('http://localhost:3003/user', user).subscribe((user: Object) => {
    });

  }

  save(user: UsersData) {
    return this.http.put('http://localhost:3003/user/' + user.id, user).subscribe(data=>console.log(data));
  }
  delete(id: bigint) {
    this.http.delete('http://localhost:3003/user/' + id).subscribe((data: Object) => {
    });
  }

  session(sesiy: any) {
    localStorage.setItem('session', JSON.stringify(sesiy));
  }
  initChekButton(isEdit: boolean) {
    if (isEdit == false) {
      this.ChekButton = "Вход";
      //localStorage.setItem('vhod', JSON.stringify(this.ChekButton));  

    }
    if (isEdit == true) {
      this.ChekButton = "Выход";
     // localStorage.setItem('vhod', JSON.stringify(this.ChekButton));  

      
    }
   
  }
  getChekButton() {  
    return this.ChekButton;
  }
  initUser(user: UsersData) {
    this.user=user
  }
  getUsera() {  
    return this.user;
  }
}
