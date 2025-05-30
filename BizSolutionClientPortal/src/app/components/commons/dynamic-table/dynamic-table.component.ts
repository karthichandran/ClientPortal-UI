import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { ToastrService,ToastrModule ,provideToastr,TOAST_CONFIG  } from 'ngx-toastr';
@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})
export class DynamicTableComponent implements OnInit {
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @Input() tableData: any[] = []; // Data for rows
  @Input() projectDetails: any;
  columns: string[] = []; // Automatically determined column headers
  allSelected: boolean = false; // Track the select all status
  projectName: string;
  unitNo: string;
  notes:string;
  fileName:string;
  headers: string[] = [];
  sumColumns: string[] = [];
  showSelection: boolean = true; 
  constructor(private location: Location, private dataService: DataService, private toastr: ToastrService) {}

  ngOnInit(): void {
   // this.tableData = this.formUnits;
    // if (this.formUnits.length > 0) {
    //   this.columns = Object.keys(this.tableData[0]).filter(key => key !== 'selected');
    // }
    this.getData();
  }

  getData() {
    const data = this.dataService.getData();
    if (data === undefined || data.data.length === 0 || data.data === undefined || data.data === null)
      this.location.back();
    this.projectName = data.projectName;
    this.unitNo = data.unitNo;
    this.notes = data.notes;
    this.fileName=data.fileName;
this.sumColumns=data.sumColumns;
    this.tableData = data.data;
    this.headers=data.header;
    this.showSelection=data.showSelection;
    this.columns = Object.keys(this.tableData[0]).filter(key => key !== 'selected');
  }
  getColumnSum(column: string): string {
    var isSumColumn=this.sumColumns.find(x=>x==column);
    if (isSumColumn==undefined) 
      return "";
    return this.tableData.reduce((sum, row) => sum + (Number(row[column]) || 0), 0).toFixed(2);
  }
  // formUnits = [
  //   {
  //     amountPaid: '1000',
  //     tdsAmount: '100',
  //     certificateNo: 'Cert001',
  //     certificateDate: '08/12/2024',
  //     selected: false
  //   },
  //   {
  //     amountPaid: '2500',
  //     tdsAmount: '250',
  //     certificateNo: 'Cert005',
  //     certificateDate: '08/06/2024',
  //     selected: false
  //   },
  //   {
  //     amountPaid: '4000',
  //     tdsAmount: '400',
  //     certificateNo: 'Cert006',
  //     certificateDate: '08/12/2024',
  //     selected: false
  //   },
  //   {
  //     amountPaid: '3500',
  //     tdsAmount: '350',
  //     certificateNo: 'Cert007',
  //     certificateDate: '08/11/2024',
  //     selected: false
  //   },
  //   {
  //     amountPaid: '4500',
  //     tdsAmount: '450',
  //     certificateNo: 'Cert008',
  //     certificateDate: '08/09/2024',
  //     selected: false
  //   }
  // ];

  toggleSelectAll() {
    this.allSelected = !this.allSelected;
    this.tableData.forEach(row => (row.selected = this.allSelected));
  }

  checkIfAllSelected() {
    this.allSelected = this.tableData.every(row => row.selected);
  }

  goBack(): void {
    this.location.back();
  }

  downloadSelectedRows() {
    const selectedRows = this.tableData.filter(row => row.selected);
    this.downloadData(selectedRows);
  }

  downloadAllRows() {
    this.downloadData(this.tableData);
  }
  download() {
    if(this.showSelection==true){
    const selectedRows = this.tableData.filter(row => row.selected);
    if(selectedRows==undefined || selectedRows.length==0)
    {
      this.toastr.error('Please select at least one row to download.');
      return;
    }
    this.downloadData(selectedRows);}
    else
    {
      window.open('https://myprestige.prestigeconstructions.com/index', '_blank');
    }
  }

  private downloadData(data: any[]) {
    const updatedData = data.map(({ selected, ...rest }) => rest);
    const csvData = this.convertToCSV(updatedData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', this.fileName+'.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCSV(objArray: any[]) {
    const array = [Object.keys(objArray[0])].concat(objArray);
    return array
      .map(it => {
        return Object.values(it).toString();
      })
      .join('\n');
  }
  isScrollXEnabled: boolean = false;
  enableScrollX() {
    this.isScrollXEnabled = !this.isScrollXEnabled;
    this.tableContainer.nativeElement.classList.add('show-scroll-x');
  }
}
