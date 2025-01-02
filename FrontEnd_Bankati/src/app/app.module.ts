import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import {CurrencyConverterComponent} from "./currency-converter/currency-converter.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {MatIconModule} from "@angular/material/icon";
import {TestComponent} from "./test/test.component";

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {CreateClientComponent} from "./create-client/create-client.component";
import {AuthInterceptor} from "./service/auth.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {PortefeuilleService} from "./service/PortefeuilleService.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    CurrencyConverterComponent,
    SideBarComponent,
    MatIconModule,
    TestComponent,
    ChangePasswordComponent,
    RouterModule.forRoot(routes),
    CommonModule,
    CreateClientComponent,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [PortefeuilleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas); // Ajout des icônes solid (optionnel)
  }
}
