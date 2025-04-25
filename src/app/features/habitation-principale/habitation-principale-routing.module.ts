import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitationPrincipalePreFormComponent } from './habitation-principale-pre-form/habitation-principale-pre-form.component';

const routes: Routes = [
  {
    path: 'pre-form',
    component: HabitationPrincipalePreFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitationPrincipaleRoutingModule { }
