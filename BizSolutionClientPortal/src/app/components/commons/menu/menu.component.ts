import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
@Component({
  selector: 'app-horizontal-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
    constructor(public clientService: ClientService,private router:Router,){}
  // Define menu items
  menuItems = [
    { label: 'Property Details', link: '/' },
    { label: 'Seller Payment', link: '/payments-to-seller' },
    { label: 'TDS Compliance', link: '/tds-compliance' },
    { label: 'Form 16B', link: '/form-16B' }  
   
  ];

  onMenuClick(item: any) {
    console.log('Menu clicked:', item.label);
  }
  logout(){
    this.clientService.logout();
    this.router.navigate(["/login"]);
  }
}