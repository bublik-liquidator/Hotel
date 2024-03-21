import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { UsersData } from './users-data';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class SharedServiceUsers {
  user = new UsersData();
  users: UsersData[] = [];
  editeduser = new UsersData();
  dialogRef: MatDialogRef<any>
  constructor( private http: HttpClient, private router: Router ) {
  }
  initdialogRef( dialogRef: any ) {
    this.dialogRef = dialogRef
  }
  getdialogRef() {
    return this.dialogRef
  }
  inituser( user: UsersData ) {
    this.user = user;
  }
  getuser(): UsersData {
    return this.user;
  }
  edituser( user: UsersData ) {
    UsersData.copyFieldsValuesTo( user, this.user );
  }


  putTokenUser( user: UsersData ) {
    this.http.post( 'http://localhost:3000/api/auth', user ).subscribe( ( data: Object ) => {
      localStorage.setItem( 'activleUser', JSON.stringify( data ) );
    } );
    return this.http.post( 'http://localhost:3000/api/auth', user )
  }
  puttTokenUser( user: UsersData ) {
    return this.http.post( 'http://localhost:3000/api/auth', user );
   
  }
  putUser( user: UsersData ) {
    return this.http.post( 'http://localhost:3000/api/user', user ).subscribe( ( data: Object ) => {
      localStorage.setItem( 'activleUser', JSON.stringify( data ) );
    } );
  }

  getAll(): Observable<any> {
    return this.http.get( 'http://localhost:3000/api/user' );
  }

  getById( id: bigint ) {
    return this.http.get<UsersData>( `http://localhost:3000/api/user/${ id }` );
  }

  create( user: UsersData ){
    console.log(user)
    return this.http.post( 'http://localhost:3000/api/register/admin', user )
}

createUser( user: UsersData ){
  console.log(user)
  return this.http.post( 'http://localhost:3000/api/register', user )
}
  save( user: UsersData ) {
    return this.http.put( 'http://localhost:3000/api/user/' + user.id, user );
  }

  save_change_password( user: UsersData ) {
    return this.http.put( 'http://localhost:3000/api/user/change_password' + user.id, user );
  }

  saveInfoUser(user: UsersData, hotelId: number) {
    const userUpdate = this.http.put(`http://localhost:3000/api/user/${user.id}`, user).toPromise();

    if (hotelId) {
        const managerAssign = this.http.put(`http://localhost:3000/api/hotel/${hotelId}/assign_manager`, { manager_id: user.id }).toPromise();
        return Promise.all([userUpdate, managerAssign]);
    } else {
        return userUpdate;
    }
}

  delete( id: bigint ): Observable<any> {
    return this.http.delete( 'http://localhost:3000/api/user/' + id )
  }

  session( sesiy: any ) {
    localStorage.setItem( 'session', JSON.stringify( sesiy ) );
  }

}
