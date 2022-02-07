import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { RocketVM } from 'service-proxies/service-proxies';
import * as signalR from "@microsoft/signalr";
import { ResponseCommand } from 'app/shared/model/response';

@Component({
    selector: 'details-dialog',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {
    hubConnection: any;
    constructor(
        public dialogRef: MatDialogRef<DetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: RocketVM
    ) {
        this.initSignalR();
    }

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.apiurl + '/hub-rocket/?rocketId=' + this.data.id,
                {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
            .build();
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch((err: any) => console.log('Error while starting connection: ' + err))
    }

    initSignalR() {
        if (this.data.id) {
            this.startConnection();
            this.hubConnection.on('Command', (rocketId: string, rocket: RocketVM) => {
                this.data.altitude = rocket.altitude;
                this.data.speed = rocket.speed;
                this.data.acceleration = rocket.acceleration;
                this.data.thrust = rocket.thrust;
                this.data.temperature = rocket.temperature;
                this._changeDetectorRef.markForCheck();
            })
        }
    }
    closeConnectionSR() {
        console.log(this.hubConnection)
        if (!this.hubConnection)
            return;
        else {
            this.hubConnection.invoke('SendCommand', Number(this.data.id), "Close");
            this.hubConnection.off('Close');
            this.hubConnection.stop();
            this.hubConnection = null;
        }
    }
    onOkClick(): void {
        this.dialogRef.close(this.data);
        this.closeConnectionSR();
    }
    onNoClick(): void {
        this.dialogRef.close();
        this.closeConnectionSR();
    }
}
