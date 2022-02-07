import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'cronos-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    public confirmMessage: string;
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
        this.confirmMessage = "";
    }

}
