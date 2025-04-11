import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [MainLayoutComponent]  
})
export class MainLayoutModule { }
