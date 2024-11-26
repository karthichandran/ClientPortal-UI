/** Angular Imports */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


import { AuthenticationService } from './authentication.service';


/**
 * Route access authorization.
 */
@Injectable({
    providedIn: 'root'  // This ensures the service is available app-wide
  })
export class AuthenticationGuard implements CanActivate {

  /**
   * @param {Router} router Router for navigation.
   * @param {AuthenticationService} authenticationService Authentication Service.
   */
  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  /**
   * Ensures route access is authorized only when user is authenticated, otherwise redirects to login.
   *
   * @returns {boolean} True if user is authenticated.
   */
  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    }

    //this.authenticationService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

}
