import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompanyMasterComponent } from './components/company-master/company-master.component';
import { RoleTypeComponent } from './components/role-type/role-type.component';
import { RoleMasterComponent } from './components/role-master/role-master.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { DigitalSignatureComponent } from './components/digital-signature/digital-signature.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'company-master', component: CompanyMasterComponent},
    {path: 'role-type', component: RoleTypeComponent},
    {path: 'role-master', component: RoleMasterComponent},
    {path: 'user-registration', component: UserRegistrationComponent},
    {path: 'digital-sign', component: DigitalSignatureComponent},

    
];
