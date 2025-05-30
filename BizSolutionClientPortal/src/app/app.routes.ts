import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Form16BComponent } from './components/form-16-b/form-16-b.component';
import { TdsComplianceComponent } from './components/tds-compliance/tds-compliance.component';
import { PaymentsToSellerComponent } from './components/payments-to-seller/payments-to-seller.component';
import { DynamicTableComponent } from './components/commons/dynamic-table/dynamic-table.component';
import { AuthenticationGuard } from './services/authentication/authentication.guard';
import{FaqComponent} from './faq/faq.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
    // {path:'',component:LoginComponent},
    {path:'faq',component:FaqComponent},
    {path : '',component:HomeComponent,canActivate:[AuthenticationGuard]},
    {path:'login',component:LoginComponent},
    {path:'reset-pwd',component:ResetPasswordComponent},
    {path:'form-16B',component:Form16BComponent,canActivate:[AuthenticationGuard]},
    {path:'tds-compliance',component:TdsComplianceComponent,canActivate:[AuthenticationGuard]},
    {path:'payments-to-seller',component:PaymentsToSellerComponent,canActivate:[AuthenticationGuard]},
    {path:'table/:unitNo',component:DynamicTableComponent,canActivate:[AuthenticationGuard]}
       
];
