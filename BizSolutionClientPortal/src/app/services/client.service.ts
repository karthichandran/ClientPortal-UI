import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject,Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import baseUrl from './backend-details';
import { ToastrService,ToastrModule ,provideToastr,TOAST_CONFIG  } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http:HttpClient
  constructor(
    http: HttpClient,private toastr: ToastrService
  ) { this.http = http}
  public loginStatusSubject = new Subject<boolean>();

  public setPanId(panId:any){
    localStorage.setItem('panId',panId);
  }
  public getPanId(){
    return localStorage.getItem('panId');
  }

  public logout(){
    localStorage.removeItem('panId');
    sessionStorage.removeItem('client_auth_token');
    sessionStorage.removeItem('client_refresh_token');
    this.loginStatusSubject.next(false);
  }
  public isLogedIn(){
    let panId  = localStorage.getItem('panId');
    console.log("this is pan ",panId)
    if(panId == undefined || panId == '' || panId == null){
      return false;
    }else{
      return true;
    }
  }
 
  public doLogin(user: string, pwd: string): Observable<any> {
   return this.http.post('auth/login', { 'username': user, 'password': pwd }).pipe(map((res: any) => {
      sessionStorage.setItem('client_auth_token', res.token);
      sessionStorage.setItem('client_refresh_token', res.refreshToken);
      this.startRefreshTokenTimer();
      return of(res);
    }));
  }
  public savePassword(user: string, pwd: string,newPwd:string): Observable<any> {
    return this.http.post('auth/savePassword', { 'username': user, 'password': pwd,'newPassword':newPwd }).pipe(map((res: any) => {
return res;
    }));
  }
  
  refreshToken(): void {
    var tokenObj :any= sessionStorage.getItem("client_refresh_token");
    this.http.post('auth/refresh', {pan:'',refreshToken:tokenObj} )
      .subscribe((data:any) => {
        sessionStorage.setItem('client_auth_token', data.token);
        sessionStorage.setItem('client_refresh_token', data.refreshToken);
        this.startRefreshTokenTimer();

      });    
  }
  private refreshTokenTimeout;

  private startRefreshTokenTimer() {   
    // set a timeout to refresh the token a minute before it expires
    const timeout = 25* (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
  }
   stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
  public getCustomerDetails(panId:any){
    //return this.http.get(`${baseUrl}/${panId}`);
    return this.http.get("customer/"+panId);
  }

  //====== Form 16B
  public getForm16b(panId:any){
    //return this.http.get(`${baseUrl}/${panId}`);
    return this.http.get("From16BCertificate/"+panId);
  }

  public getForm16bPaymentsList(companyId:any,ownershipId:any){
    //return this.http.get(`${baseUrl}/${panId}`);
    return this.http.get("From16BCertificate/"+companyId+"/"+ownershipId);
  }

  // ====== End

  // ====== Payment to seller
  public getPaymentToSellerMaster(panId:any){
    //return this.http.get(`${baseUrl}/${panId}`);
    return this.http.get("SellerPayments/"+panId);
  }

  public getSellerPaymentList(companyId:any,ownershipId:any){
    //return this.http.get(`${baseUrl}/${panId}`);
    return this.http.get("SellerPayments/paymenthistory/"+companyId+"/"+ownershipId);
  }

  // ====== End

  // ====== Tds Compliance
  public getTdsComplianceMaster(panId:any){
    //return this.http.get(`${baseUrl}/${panId}`);
    return this.http.get("tdsCompliance/"+panId);
  }

  public getTdsCompliancePaymentList(companyId:any,ownershipId:any){
    //return this.http.get(`${baseUrl}/${panId}`);
    return this.http.get("tdsCompliance/"+companyId+"/"+ownershipId);
  }

}
