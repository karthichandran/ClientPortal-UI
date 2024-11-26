/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest ,HttpHandlerFn } from '@angular/common/http';
import { HttpInterceptorFn } from '@angular/common/http';
/** rxjs Imports */
import { Observable } from 'rxjs';
import baseUrl from '../backend-details';


/** Http request options headers. */
const httpOptions = {
  headers:{}
};

/** Authorization header. */
const authorizationHeader = 'Authorization';
/** Two factor access token header. */
//const twoFactorAccessTokenHeader = 'Fineract-Platform-TFA-Token';

/**
 * Http Request interceptor to set the request headers.
 */
// @Injectable()
// export class AuthenticationInterceptor implements HttpInterceptor {

//   constructor() {}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     this.setAuthorizationToken();
//     request = request.clone({ setHeaders: httpOptions.headers });
//     return next.handle(request);
//   }

//   setAuthorizationToken() {
//     if ((httpOptions.headers[authorizationHeader]===undefined) || httpOptions.headers[authorizationHeader] == "") {
//       let tokenObj:any = {};    
//       if (localStorage.getItem("auth_token") != "" && localStorage.getItem("auth_token")!=null)
//         tokenObj = JSON.parse(localStorage.getItem("auth_token")); 
//       httpOptions.headers[authorizationHeader] = `Bearer ${tokenObj.token}`;
//     }
//   }
//   setAuthorizationNewToken(token: string) {
//     httpOptions.headers[authorizationHeader] = `Bearer ${token}`;
//   }


//   removeAuthorization() {
//     delete httpOptions.headers[authorizationHeader];
//   }
// }
export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  req = req.clone({ url: baseUrl+'/api/'+req.url});

    if ((httpOptions.headers[authorizationHeader] === undefined) || httpOptions.headers[authorizationHeader] == "") {
        let tokenObj: any = {};
        if (sessionStorage.getItem("client_auth_token") != "" && sessionStorage.getItem("client_auth_token") != null)
            tokenObj = sessionStorage.getItem("client_auth_token");
        httpOptions.headers[authorizationHeader] = `Bearer ${tokenObj}`;
    }

    var  token = sessionStorage.getItem("client_auth_token");
    var authToken=`Bearer ${token}`;
    const modifiedReq = req.clone({
       // setHeaders:  httpOptions.headers
        setHeaders:  {Authorization:authToken}
      });
    // const modifiedReq = req.clone({
    //   setHeaders: {
    //     Authorization: `Bearer YOUR_TOKEN_HERE`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    return next(modifiedReq);
  };