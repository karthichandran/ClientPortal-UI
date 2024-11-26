import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 clientData:any=[];
 notes:string;

  constructor( private router : Router,

    private clientService : ClientService
  ) {};

  panId:any;

  ngOnInit(): void {
    this.panId = this.clientService.getPanId();
    //this.panId='AANPV2131N';
    this.clientService.getCustomerDetails(this.panId).subscribe(
      (data)=>{

        this.clientData=data;
        this.clientData.forEach((unit:any, i:number) => {
          this.showPassword[i] = [];
          unit.customerList.forEach((customer:any, j:number) => {
            this.showPassword[i][j] = {
              tracesPassword: false,
              incomeTaxPassword: false
            };
          });
        });

        this.notes=this.clientData[0].notes;
        console.log("this is data ",data);
      },(error)=>{
        console.log("this is error ",error);
      }
    )   
  }

bizLogo = 'assets/biz-logo.png'
reproLogo = 'assets/repro-logo.png'

getCustomerName(): string {
  if (this.clientData.length > 0) {
    return this.clientData[0].customerList[0].name;
  }
  return '';
}
showPassword: any[][] = [];

logout(){
  this.router.navigate(["/login"]);
}


togglePassword(unitIndex: number, customerIndex: number, passwordType: string) {
  this.showPassword[unitIndex][customerIndex][passwordType] = !this.showPassword[unitIndex][customerIndex][passwordType];
}
getNumberOfUnits(): number {
  return this.clientData.length;
}
getCompanyImage(companyName: string): string {
  if (companyName.toLowerCase() === 'prestige' || companyName.toLowerCase() === 'repro') {
    return this.bizLogo;
  } else {
    return this.reproLogo;
  }
}
}
