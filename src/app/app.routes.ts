import { Routes } from '@angular/router';
import { CompanyMasterComponent } from './components/company-master/company-master.component';
import { DigitalSignatureComponent } from './components/digital-signature/digital-signature.component';
import { RoleMasterComponent } from './components/role-master/role-master.component';
import { RoleTypeComponent } from './components/role-type/role-type.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth.guard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },    
    {path: 'login', component:LoginComponent},
    {path: 'company-master', component: CompanyMasterComponent,canActivate: [AuthGuardService]},
    {path: 'role-type', component: RoleTypeComponent, canActivate: [AuthGuardService]},
    {path: 'role-master', component: RoleMasterComponent,canActivate: [AuthGuardService]},
    {path: 'user-registration', component: UserRegistrationComponent, canActivate: [AuthGuardService]},
    {path: 'digital-sign', component: DigitalSignatureComponent , canActivate: [AuthGuardService]},
    { path: '**', redirectTo: 'role-type' },

    
];
