import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/rockets', pathMatch: 'full' },
      {
        path: 'rockets',
        loadChildren: () => import('./rockets/rockets.module').then(m => m.RocketsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
