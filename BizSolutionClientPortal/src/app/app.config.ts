import { ApplicationConfig } from '@angular/core';
import { provideRouter ,withComponentInputBinding } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { routes } from './app.routes';
import { provideHttpClient,withInterceptors,HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { authenticationInterceptor } from './services/authentication/authentication.interceptor';
import { progressbarInterceptor } from './services/progressbar/progressbar.interceptor';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()),{ provide: LocationStrategy, useClass: HashLocationStrategy },provideHttpClient(withInterceptors([progressbarInterceptor]) ),provideHttpClient(withInterceptors([authenticationInterceptor]) ),
  provideAnimations(),
  provideToastr({    
    positionClass: 'toast-top-center',
    preventDuplicates: true,
  })
  //   ,{ 
  //   provide: HTTP_INTERCEPTORS, 
  //   useClass: AuthenticationInterceptor, 
  //   multi: true 
  // }
],
};
