/** Angular Imports */
import { Injectable,inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest ,HttpHandlerFn,HttpResponse } from '@angular/common/http';
import { HttpInterceptorFn } from '@angular/common/http';
/** rxjs Imports */
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import baseUrl from '../backend-details';
import { ProgressBarService } from './progressbar.service';



export const progressbarInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router); 
    const progressBarSvc = inject(ProgressBarService);
  if (req.url.includes('refresh'))
    return next(req) 

  progressBarSvc.increase();
  return next(req)
    .pipe(
      tap(  {
        // Access the response here
        next: (event) => {
            if (event instanceof HttpResponse) 
            progressBarSvc.decrease();
        },
        error: (error) => {         
            progressBarSvc.decrease();
            if(error.status===401){
              router.navigate(['/login'], { replaceUrl: true });
              sessionStorage.removeItem('client_auth_token');
              sessionStorage.removeItem('client_refresh_token');
            }
        }
      })
    );
    
  };