/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/** rxjs Imports */
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';




/**
 * Authentication workflow.
 */
@Injectable({
    providedIn: 'root'  // This ensures the service is available app-wide
  })
export class AuthenticationService {

  /** Denotes whether the user credentials should persist through sessions. */
  private rememberMe: boolean=false;
  /**
   * Denotes the type of storage:
   *
   * Session Storage: User credentials should not persist through sessions.
   *
   * Local Storage: User credentials should persist through sessions.
   */
  private storage: any;
  /** User credentials. */

  private credentials: Credentials;
  /** Key to store credentials in storage. */
  private credentialsStorageKey = 'mifosXCredentials';
  /** Key to store oauth token details in storage. */
  private oAuthTokenDetailsStorageKey = 'mifosXOAuthTokenDetails';
  /** Key to store two factor authentication token in storage. */
  private twoFactorAuthenticationTokenStorageKey = 'mifosXTwoFactorAuthenticationToken';

  /**
   * Initializes the type of storage and authorization headers depending on whether
   * credentials are presently in storage or not.
   * @param {HttpClient} http Http Client to send requests.
   * @param {AlertService} alertService Alert Service.
   * @param {AuthenticationInterceptor} authenticationInterceptor Authentication Interceptor.
   */
  constructor(private http: HttpClient ) {
  
  }

  
  
  isAuthenticated(): boolean {
    return (sessionStorage.getItem("client_auth_token")!=null || localStorage.getItem("client_auth_token")!=null );
  }

  /**
   * Gets the user credentials.
   * @returns {Credentials} The user credentials if the user is authenticated otherwise null.
   */
  getCredentials(): Credentials | null {
    return JSON.parse(this.storage.getItem(this.credentialsStorageKey));
  }

  /**
   * Sets the user credentials.
   *
   * The credentials may be persisted across sessions by setting the `rememberMe` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   *
   * @param {Credentials} credentials Authenticated user credentials.
   */
  private setCredentials(credentials?: Credentials) {
    if (credentials) {
      credentials.rememberMe = this.rememberMe;
      this.storage.setItem(this.credentialsStorageKey, JSON.stringify(credentials));
    } else {
      this.storage.removeItem(this.credentialsStorageKey);
      this.storage.removeItem(this.oAuthTokenDetailsStorageKey);
      this.storage.removeItem(this.twoFactorAuthenticationTokenStorageKey);
    }
  }



}

export interface Credentials {
    accessToken?: string;
    authenticated: boolean;
    base64EncodedAuthenticationKey?: string;
    isTwoFactorAuthenticationRequired?: boolean;
    officeId: number;
    officeName: string;
    staffId?: number;
    staffDisplayName?: string;
    organizationalRole?: any;
    permissions: string[];
    roles: any;
    userId: number;
    username: string;
    shouldRenewPassword: boolean;
    rememberMe?: boolean;
  }
  