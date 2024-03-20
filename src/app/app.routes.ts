import { Routes } from '@angular/router';
import { CompanyMasterComponent } from './components/company-master/company-master.component';
import { DigitalSignatureComponent } from './components/digital-signature/digital-signature.component';
import { RoleMasterComponent } from './components/role-master/role-master.component';
import { RoleTypeComponent } from './components/role-type/role-type.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: 'role-type', pathMatch: 'full'},
    {path: 'login', component:LoginComponent},
    {path: 'company-master', component: CompanyMasterComponent},
    {path: 'role-type', component: RoleTypeComponent},
    {path: 'role-master', component: RoleMasterComponent},
    {path: 'user-registration', component: UserRegistrationComponent},
    {path: 'digital-sign', component: DigitalSignatureComponent},
];
