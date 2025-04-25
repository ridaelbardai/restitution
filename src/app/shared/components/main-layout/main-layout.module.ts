import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { HomeComponent } from 'src/app/features/home/home.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    NavMenuComponent,
    HomeComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  exports: [MainLayoutComponent]  
})
export class MainLayoutModule { }
