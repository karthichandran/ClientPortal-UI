import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from '../commons/dynamic-table/dynamic-table.component';
import { Route, Router } from '@angular/router';
import { UnitListComponent } from '../commons/unit-list/unit-list.component';
import { ClientService } from '../../services/client.service';
import { DataService } from '../../services/data.service';
import * as _ from 'lodash';
import moment from 'moment';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-form-16-b',
  standalone: true,
  imports: [CommonModule,FormsModule,DynamicTableComponent,UnitListComponent],
  templateUrl: './form-16-b.component.html',
  styleUrl: './form-16-b.component.css'
})
export class Form16BComponent implements OnInit{

  pageName = "Form 16B Certificate";
  panId:any;
  clientData:any=[];
  units:any = []
  constructor(private router:Router, private clientService : ClientService,private dataService: DataService){

  }

  ngOnInit(): void {
    this.panId = this.clientService.getPanId();
   // this.panId='AANPV2131N';
    this.units = [];
    this.clientService.getForm16b(this.panId).subscribe(
      (data) => {

        this.clientData = data;
        this.clientData.forEach((company: any, i: number) => {         
          var grp = _.groupBy(company.customerList, 'unitNo');
         
          _.forOwn(grp, (cus,unitNum ) => {
            var unit: any = {};      
            unit.companyName = company.companyName;
            unit.unitNo = unitNum;
            unit.notes=cus[0].notes;
            unit.customerList=[];
           
            cus.forEach(item => {
              unit.propertyId = item.propertyId;
              unit.propertyName = item.propertyName;
              unit.declarationDate= moment( item.declarationDate).format("DD-MM-YYYY");
              unit.ownershipId= item.ownershipId;
              unit.customerList.push({
                name: item.customerName,            
                isPrimaryOwner:item.isPrimaryOwner
              });
            });

            this.units.push(unit);
          });          

        });

        console.log("this is data ", data);
      }, (error) => {
        console.log("this is error ", error);
      }
    )
  }
 
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

  getCompanyId(name: string) {
    if (name.toLowerCase() === 'repro')
      return 1;
    else if (name.toLowerCase() === 'prestige')
      return 2;
    else
      return 3;
  }

  getPaymentDetails(companyId: any, ownershipId: any) {    
    return this.clientService.getForm16bPaymentsList(companyId, ownershipId);
  }

  viewDeclaration(unit: any): void {
   //    this.router.navigate(['/table']);
  }

  
  paymentDetails(unit: any) {
    var companyId = this.getCompanyId(unit.companyName);
    this.getPaymentDetails(companyId, unit.ownershipId).subscribe(res => {

      var unitNo = unit.unitNo;
      var project = unit.propertyName;
      var note=unit.notes;
      var data = [];
      _.forEach(res, o => {
        data.push({
          CustomerName:o.customerName,
          AmountPaid: o.amountPaid,
          TDSAmount: o.tdsAmount,
          CertificateNo: o.certificateNo,
          CertificateDate:  o.certificateDate===null?"": moment( o.certificateDate).format("DD-MM-yyyy"),
          selected: false
        });
      });
      var headers=["Customer Name","Amount Paid","TDS Amount","Certificate No","Certificate Date"];
      var model = {
        fileName:"Form-16B",
        unitNo: unitNo,
        projectName: project,
        notes:note,
        data: data,
        header:headers
      }
    
      this.dataService.setData(model);
      this.router.navigate(['/table', 0]);
    });

  }

}
