import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { HomeComponent } from './home.component';
import { SidenavComponent } from '../templates/sidenav/sidenav.component';
import { FooterComponent } from '../templates/footer/footer.component';

import { ServicesModule } from '../services/services.module';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    SidenavComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
  ],
  exports: [
    SidenavComponent,
    FooterComponent,
    HomeComponent,
  ],
  providers: [ServicesModule],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
