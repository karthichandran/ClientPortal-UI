import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from '../commons/dynamic-table/dynamic-table.component';
import { UnitListComponent } from '../commons/unit-list/unit-list.component';
import { Route, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { DataService } from '../../services/data.service';
import * as _ from 'lodash';
import moment from 'moment';
@Component({
  selector: 'app-tds-compliance',
  standalone: true,
  imports: [CommonModule,FormsModule,DynamicTableComponent,UnitListComponent],
  templateUrl: './tds-compliance.component.html',
  styleUrl: './tds-compliance.component.css'
})
export class TdsComplianceComponent implements OnInit {
  panId:any;
  clientData:any=[];
  units:any = []
  constructor(private router:Router, private clientService : ClientService,private dataService: DataService){

  }
  ngOnInit(): void {
    this.panId = this.clientService.getPanId();
    //this.panId='AANPV2131N';
    this.units = [];
    this.clientService.getTdsComplianceMaster(this.panId).subscribe(
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
pageName = "TDS Compliance";
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

  viewDeclaration(unit: any) {
   // alert('Viewing declaration for Unit No. ' + unit.unitNo);
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
    return this.clientService.getTdsCompliancePaymentList(companyId, ownershipId);
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
          DateOfPayment: o.dateOfPayment===null?"":moment( o.dateOfPayment).format("DD-MM-yyyy"),
          TDSAmount: o.tdsAmount,
          Status: o.status,
          TDSPaidDate: o.tdsPaidDate===null?"":moment( o.tdsPaidDate).format("DD-MM-yyyy"),
          CertificateNo:o.form16BCertificateNo,
          Form16BDate:o.form16BDate===null?"":moment( o.form16BDate).format("DD-MM-yyyy"),
          ReceiptNo: o.receiptNo,
          AmountPaid:o.amountPaid,
          GSTAmount:o.gstAmount,
        GrossAmount:o.grossAmount,
          selected: false
        });
      });
      var headers=["Customer Name","Date Of Payment","TDS Amount", "Status","TDS Paid Date","Certificate No","Form16B Date","Receipt No","Amount Paid","GST Amount","Gross Amount"];

      var model = {
        fileName:"TDS-Compliance",
        unitNo: unitNo,
        notes:note,
        projectName: project,
        data: data,
        header:headers
      }
      this.dataService.setData(model);
      this.router.navigate(['/table', 0]);
    });

  }


}
