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
  oldPassword = new FormControl("",[
   
  ])
  newPassword = new FormControl("",[
    
  ])
  confirmPassword = new FormControl("",[    
  ])

  loginForm = new FormGroup({
    userName : this.userName,
    password : this.password,
    // oldPassword : this.oldPassword,
    // newPassword : this.newPassword,   
    // confirmPassword : this.confirmPassword
  })
  message: string = '';
  messageClass: string = 'text-danger';
isLogin:boolean = true;
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
this.isLogin=false;
    // Simulate sending an email
    // this.message = `Please check your email sent to 'XXXXXX' to reset password`;
    // this.messageClass = 'text-success'
   
  }
cancel(){
  this.isLogin=true; 
}
isDefined(value: any): boolean {
  return value !== undefined && value !== null && value !== '';
}
saveNewPassword(){
  var user = this.loginForm.value.userName;
  var oldPwd =this.oldPassword.value;
  var newPwd = this.newPassword.value;
  var confirmPwd = this.confirmPassword.value;
  if(this.isDefined(oldPwd) && this.isDefined(newPwd) && this.isDefined(confirmPwd)){    
    if(newPwd != confirmPwd){
      this.toastr.error("New Password and Confirm Password are not matching");
      return;
    }
    this.clientService.savePassword(user, oldPwd,newPwd).subscribe((data: any) => {
      this.oldPassword.setValue("");
      this.newPassword.setValue("");  
      this.confirmPassword.setValue("");
      this.loginForm.reset();
      this.toastr.success("Password is saved successfully");
      this.isLogin=true;
    }, (error) => {
      var msg= error.error.error;
      this.toastr.error(msg);
    });
  }else{
    this.toastr.error("Please enter all the fields");
    return;
  }
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
        this.toastr.error("Invalid Credentials");
      });
      this.clientService.loginStatusSubject.next(true);

    }
  }

  openFAQs() {
    // Open the FAQs page (you can navigate to a new route or open a modal)
   // this.router.navigate(['/faq'], { replaceUrl: true });
   const urlTree = this.router.createUrlTree(['/faq']);
   // Serialize the URL tree into a string
   const relativeUrl = this.router.serializeUrl(urlTree);
   // Prepend the current origin to form an absolute URL
   const fullUrl = window.location.origin +"/#"+ relativeUrl;
   // Open the absolute URL in a new browser tab
   window.open(fullUrl, '_blank');
  
  }

}
