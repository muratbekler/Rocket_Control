import "@angular/compiler"
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RocketsComponent } from './list/rockets.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from "./details/details.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ConfirmDialogModule } from "app/component/confirm-dialog/confirm-dialog.module";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Rockets",
      urls: [{ title: "Rockets", url: "/rockets" }, { title: "Rockets" }],
    },
    component: RocketsComponent,
  },
];
@NgModule({
  declarations: [
    RocketsComponent,
    DetailsComponent,
     
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ConfirmDialogModule,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [
    DetailsComponent
],
})
export class RocketsModule { }
