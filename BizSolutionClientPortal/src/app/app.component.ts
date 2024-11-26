import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './services/client.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/commons/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,HeaderComponent,HttpClientModule,CommonModule,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'biz-services-client-portal';
  constructor(public clientService: ClientService,private router:Router,private elementRef: ElementRef){}
  isLogedIn = false;
  
  showLogoutButton = false;
  isMenuVisible = false;
  menuItems = [
    { label: 'Property Details', link: '/' },
    { label: 'Seller Payment', link: '/payments-to-seller' },    
    { label: 'TDS Compliance', link: '/tds-compliance' },
    { label: 'Form 16B', link: '/form-16B' }   
  ];

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  ngOnInit(): void {
      this.isLogedIn = this.clientService.isLogedIn();

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Check if the current route is the login page
          this.showLogoutButton = event.url !== '/login';
        }
      });

      this.clientService.loginStatusSubject.asObservable().subscribe(
        (data)=>{
          
          this.isLogedIn = this.clientService.isLogedIn();
          console.log("we are in login update ", this.isLogedIn);
        }
      )
  }

  navigateToPage(pageLink:any){
    this.router.navigate([pageLink]);
    this.toggleMenu();
  }
  handleClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuVisible = false;
    }
  }
  preventClick(){

  }

  // @HostListener('document:click') // Listen for clicks anywhere on the document
  // onClick() {
  //   if (this.isMenuVisible) { // Close only if menu is visible
  //     this.isMenuVisible = false;
  //   }
  // }

  logout(){
    this.clientService.logout();
    this.router.navigate(["/login"]);
  }
  
}
