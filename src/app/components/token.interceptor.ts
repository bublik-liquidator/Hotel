import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const authData = JSON.parse(localStorage.getItem( 'activleUser' ) || '{}');
        const authToken = authData.token;
        const authReq = req.clone( {
            headers: req.headers.set( 'Authorization', `Bearer ${ authToken }` )
        } );
        //console.log('Request being sent:', authReq);
        //console.log('Authorization header:', authReq.headers.get('Authorization'));
        return next.handle( authReq );
    }
}
