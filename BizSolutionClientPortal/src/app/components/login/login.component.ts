import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component,HostListener, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService,ToastrModule ,provideToastr,TOAST_CONFIG  } from 'ngx-toastr';
import { panValidator } from '../../utils/validators/pan-validator';
import { ClientService } from '../../services/client.service';
import { EmailServicesService } from '../../services/email-services.service';
import { config } from 'rxjs';
// import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    
  ],
})
export class LoginComponent implements OnInit {
  
  // userName = new FormControl("",[
  //   Validators.required,
  //   panValidator()
  // ])
  userName = new FormControl("",[
    Validators.required    
  ])
  password = new FormControl("",[
    Validators.required
  ])


  loginForm = new FormGroup({
    userName : this.userName,
    password : this.password
  })
  message: string = '';
  messageClass: string = 'text-danger';

  isMediumScreen!:boolean;
  constructor(private router: Router,
    private clientService:ClientService,
    private toastr: ToastrService
    // private ema : EmailServicesService
  ) {
    this.checkScreenSize();
  }
 
  ngOnInit(): void {
    console.log("calling the logout")
      // this.clientService.logout();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMediumScreen = window.innerWidth < 992;
  }

  validatePAN(pan:Event) {
    const panValue = (pan.target as HTMLInputElement).value;
    this.userName.setValue(panValue.toUpperCase());
    if (panValue && !this.userName.valid) {
      this.message = 'Please enter a valid PAN';
      // console.log()
    } else {
      this.message = '';
    }
  }

  forgotPassword(event : Event) {
    event.preventDefault();
    if (!this.userName.valid) {
      this.message = 'Please enter a valid PAN';
      return;
    }

    // Simulate sending an email
    this.message = `Please check your email sent to 'XXXXXX' to reset password`;
    this.messageClass = 'text-success'
    // window.alert("design for this is not available ")

    // Additional logic for sending email can be added here
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.message = 'Please ensure User ID(PAN) and Password fields are correctly entered';
    }
    else {
      console.log(this.loginForm.value)
      this.clientService.setPanId(this.loginForm.value.userName);
      var user = this.loginForm.value.userName;
      var pwd = this.loginForm.value.password;
      this.clientService.doLogin(user, pwd).subscribe((data: any) => {
        this.router.navigate(["/"]);
      }, (error) => {
        this.toastr.error("Invalid Credentials")
      });
      this.clientService.loginStatusSubject.next(true);

    }
  }

  openFAQs() {
    // Open the FAQs page (you can navigate to a new route or open a modal)
    this.router.navigate(['/faqs']);
  }
}
