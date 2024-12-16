import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {Login1Component} from "./login1/login1.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'client',
    loadComponent: () => import('./create-client/create-client.component').then(m => m.CreateClientComponent)
  },
  {
    path: 'agent',
    loadComponent: () => import('./create-agent/create-agent.component').then(m => m.CreateAgentComponent)
  },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'login1', component: Login1Component }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
