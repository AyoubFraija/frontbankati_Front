import { CreateClientComponent } from './create-client/create-client.component';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { TotaleComponent } from './totale/totale.component';
import { Login1Component } from './login1/login1.component';
import { Signup1Component } from './signup1/signup1.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TestComponent } from './test/test.component';
import { FactureComponent } from './facture/facture.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminComponent } from './admin/admin.component';
import { CreancierComponent } from './creancier/creancier.component';
import {Routes} from "@angular/router";
import {AuthGuard} from "./service/AuthGuard.service";
import {CreateClientGuard} from "./guards/create-client.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'total',
    pathMatch: 'full'
  },
  {
    path: 'signup1',
    component: Signup1Component
  },
  {
    path: 'client',
    component: CreateClientComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_AGENT', 'ROLE_ADMIN'] },
  },
  {
    path: 'agent',
    component: CreateAgentComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }  // Seuls les Admin peuvent accéder à create-agent
  },
  {
    path: 'total',
    component: TotaleComponent
  },
  {
    path: 'login1',
    component: Login1Component
  },
  {
    path: 'currency',
    component: CurrencyConverterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENT'] }  // Seuls les clients peuvent accéder à currency
  },
  {
    path: 'converter',
    component: CurrencyConverterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENT'] }  // Seuls les clients peuvent accéder à converter
  },
  {
    path: 'side-bar',
    component: SideBarComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'facture',
    component: FactureComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENT'] }  // Seuls les clients peuvent accéder à facture
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENT'] }  // Seuls les clients peuvent accéder au dashboard
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }  // Seuls les Admin peuvent accéder à admin
  },
  {
    path: 'creancier',
    component: CreancierComponent
  },
];
