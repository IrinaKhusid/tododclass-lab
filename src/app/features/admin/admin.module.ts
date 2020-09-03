import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { OncallComponent } from './components/oncall/oncall.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'on-call',
        component: OncallComponent
      }
    ]
  }
];

@NgModule({
  declarations: [AdminComponent, OncallComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
