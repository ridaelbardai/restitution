import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitationPrincipaleRoutingModule } from './habitation-principale-routing.module';
import { HabitationPrincipaleComponent } from './habitation-principale/habitation-principale.component';


@NgModule({
  declarations: [
    HabitationPrincipaleComponent
  ],
  imports: [
    CommonModule,
    HabitationPrincipaleRoutingModule
  ]
})
export class HabitationPrincipaleModule { }
