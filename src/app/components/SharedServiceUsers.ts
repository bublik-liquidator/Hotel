import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { UsersData } from './users-data';

@Injectable()
export class SharedServiceUsers {
  user = new UsersData();
  users: UsersData[] = [];
  editedUser = new UsersData();
  ChekButton: string;
  inituser(user: UsersData) {
    this.user = user;
  }
  getuser(): UsersData {
    return this.user;
  }

  edituser(user: UsersData) {
    UsersData.copyFieldsValuesTo(user, this.user);
  }

  getAll() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    return this.users;
  }
  getByName(name: string) {
    if (localStorage.getItem('users') !== null) {
      this.getAll();
      // this.getAll().find(this.hotel -> this.hotel.id == id);
      // this.newHotel = this.hotels.find(({ id }) => id === id);]
      console.log('ALLL ' + this.getAll().find(({ name }) => name === name));
      return this.getAll().find(({ name }) => name === name);
    }
    return 0;
  }
  create(user: UsersData) {
    //сделать проверку на существующий IDn
    user.name = Math.floor(Math.random() * 100).toString();
    if (this.users.find(({ name }) => name === user.name)) {
      while (this.users.find(({ name }) => name === user.name)) {
        user.name = String(+Math.floor(Math.random() * 100).toString() + +Math.floor(Math.random() * 100).toString());
      }
    }

    if (+user.BronirovHotel <= 0 || +user.BronirovHotel > 5 || user.BronirovHotel == null || /[qwertyuiopasdfghjklzxcvbnm]/.test(user.BronirovHotel) || /[йцукенгшщзхъфывапролджэячсмитьбю]/.test(this.editedUser.BronirovHotel) || user.name == null || user.photo == null) {
      alert("Некоректный ввод данны");
      return 0;
    }
    else {
      this.users.push(user);
      console.log('new user saved' + user);
      this.save();
      return user;
    }


  }
  save() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  delete(name: string) {
    this.users = this.users.filter((obj) => obj.name != name);
    console.log('deleted user with name=' + name);
    this.save();
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
