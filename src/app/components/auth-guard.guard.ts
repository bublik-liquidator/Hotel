import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';


@Injectable( {
  providedIn: 'root'
} )
export class AuthGuardGuard implements CanActivate {
  constructor( private router: Router, public matdialog: MatDialog ) { }

  canActivate( route: ActivatedRouteSnapshot ): boolean {
    const activeUser = localStorage.getItem( 'activleUser' );
    if ( activeUser ) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken( activeUser );
      const expectedRoles = route.data[ 'expectedRoles' ];
      if ( expectedRoles.includes( decodedToken.role ) ) {
        return true;
      } else {
        this.matdialog.open( LoginComponent );
        return false;
      }
    } else {
      this.matdialog.open( LoginComponent );
      return false;
    }
  }
}
