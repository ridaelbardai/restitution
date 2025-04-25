import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitationPrincipaleRoutingModule } from './habitation-principale-routing.module';
import { HabitationPrincipalePreFormComponent } from './habitation-principale-pre-form/habitation-principale-pre-form.component';


@NgModule({
  declarations: [
    HabitationPrincipalePreFormComponent
  ],
  imports: [
    CommonModule,
    HabitationPrincipaleRoutingModule
  ]
})
export class HabitationPrincipaleModule { }
