import { CommonModule } from '@angular/common';
import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css'
})
export class UnitListComponent implements OnInit{
  @Input() pageName : String = "";
  @Input() units : any=[]  ;
  @Output() loadDetailsEve = new EventEmitter<any>();
  constructor(private router : Router){

  }
  
  ngOnInit(): void {
      console.log("this si pageName 0 ",this.pageName)
  }
  // units = [
  //   {
  //     "propertyId": 11,
  //     "propertyName": "Prestige Green Gables",
  //     "unitNo": "20780",
  //     "companyName": "Prestige",
  //     "companyLogo": null,
  //     "customerList": [
  //       {
  //         "customerID": 18257,
  //         "name": "Anand Kishore P R Vachani",
  //         "pan": "AANPV2131N",
  //         "tracesPassword": "Anan&123",
  //         "customerOptingOutDate": null,
  //         "incomeTaxPassword": "KA05mt6220@",
  //         "isPrimaryOwner": true
  //       },
  //       {
  //         "customerID": 18257,
  //         "name": "Anand Kishore's Mother",
  //         "pan": "AANPV2131N",
  //         "tracesPassword": "Anan&123",
  //         "customerOptingOutDate": null,
  //         "incomeTaxPassword": "KA05mt6220@",
  //         "isPrimaryOwner": false
  //       }
  //     ]
  //   },
  //   {
  //     "propertyId": 11,
  //     "propertyName": "Prestige Green Gables",
  //     "unitNo": "10950",
  //     "companyName": "Prebggtige",
  //     "companyLogo": true,
  //     "customerList": [
  //       {
  //         "customerID": 18257,
  //         "name": "Anand Kishore P R Vachani",
  //         "pan": "AANPV2131N",
  //         "tracesPassword": "Anan&123",
  //         "customerOptingOutDate": null,
  //         "incomeTaxPassword": "KA05mt6220@",
  //         "isPrimaryOwner": false
  //       }
  //     ]
  //   },
  //   {
  //     "propertyId": 22,
  //     "propertyName": "Prestige Lavender Fields",
  //     "unitNo": "12095",
  //     "companyName": "Prestige",
  //     "companyLogo": null,
  //     "customerList": [
  //       {
  //         "customerID": 18257,
  //         "name": "Anand Kishore P R Vachani",
  //         "pan": "AANPV2131N",
  //         "tracesPassword": "Anan&123",
  //         "customerOptingOutDate": null,
  //         "incomeTaxPassword": "KA05mt6220@",
  //         "isPrimaryOwner": false
  //       }
  //     ]
  //   },
  //   {
  //     "propertyId": 11,
  //     "propertyName": "Prestige Green Gables",
  //     "unitNo": "1095",
  //     "companyName": "Prestige",
  //     "companyLogo": null,
  //     "customerList": [
  //       {
  //         "customerID": 18257,
  //         "name": "Anand Kishore P R Vachani",
  //         "pan": "AANPV2131N",
  //         "tracesPassword": "Anan&123",
  //         "customerOptingOutDate": null,
  //         "incomeTaxPassword": "KA05mt6220@",
  //         "isPrimaryOwner": true
  //       }
  //     ]
  //   },
  //   {
  //     "propertyId": 64,
  //     "propertyName": "Prestige Park Grove",
  //     "unitNo": "90304",
  //     "companyName": "Prstige",
  //     "companyLogo": null,
  //     "customerList": [
  //       {
  //         "customerID": 18257,
  //         "name": "Anand Kishore P R Vachani",
  //         "pan": "AANPV2131N",
  //         "tracesPassword": "Anan&123",
  //         "customerOptingOutDate": null,
  //         "incomeTaxPassword": "KA05mt6220@",
  //         "isPrimaryOwner": true
  //       }
  //     ]
  //   },
  //   {
  //     "propertyId": 11,
  //     "propertyName": "Prestige Green Gables",
  //     "unitNo": "2078",
  //     "companyName": "Prestige",
  //     "companyLogo": null,
  //     "customerList": [
  //       {
  //         "customerID": 18257,
  //         "name": "Anand Kishore P R Vachani",
  //         "pan": "AANPV2131N",
  //         "tracesPassword": "Anan&123",
  //         "customerOptingOutDate": null,
  //         "incomeTaxPassword": "KA05mt6220@",
  //         "isPrimaryOwner": false
  //       }
  //     ]
  //   }
  // ];
bizLogo = 'assets/biz-logo.png'
reproLogo = 'assets/repro-logo.png'
  getCompanyLogo(companyName: string): string {
    return companyName === 'BIZ Services' ? 'assets/biz-logo.png' : 'assets/repro-logo.png';
  }
  getCompanyImage(companyName: string): string {
    if (companyName.toLowerCase() === 'prestige' || companyName.toLowerCase() === 'repro') {
      return this.bizLogo;
    } else {
      return this.reproLogo;
    }
  }
  logout(){
    this.router.navigate(["/login"]);
  }
  viewDeclaration(unit: any): void {
    this.loadDetailsEve.emit(unit);
   // this.router.navigate(['/table', unitNo]);
  }
}
