import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'app/component/confirm-dialog/confirm-dialog.component';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { RocketServiceProxy, RocketVM, RocketVMCustomResult, WeatherServiceProxy, WeatherVM } from 'service-proxies/service-proxies';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-rockets',
  templateUrl: './rockets.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RocketsComponent implements OnInit, AfterViewInit, OnDestroy {
  dialogRef: any;
  public isCollapsed = false;
  collapsed = true;
  actions: Observable<RocketVMCustomResult>;
  rockets: RocketVM[];
  weather: WeatherVM;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _rockerService: RocketServiceProxy,
    private _weatherService: WeatherServiceProxy,
    public _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private _changeDetectorRef: ChangeDetectorRef) {
    this.rockets = [];
    this.weather = new WeatherVM;
    this.actions = new Observable<RocketVMCustomResult>();
  }
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.rocketList();
    this.weatherStatus();
  }
  rocketList(): void {
    this._rockerService.getAll().pipe(takeUntil(this._unsubscribeAll), finalize(() => { }))
      .subscribe(result => {
        if (result.isSuccessful) {
          var data = result.datum;
          this.rockets = data as RocketVM[];
          this._changeDetectorRef.markForCheck();
        }
        else {
          this.rockets = [];
          this._matSnackBar.open(result.message as string, "Ok", {
            verticalPosition: 'top',
            duration: 2000
          });
        }
      });
  }
  weatherStatus(): void {
    this._weatherService.get().pipe(takeUntil(this._unsubscribeAll), finalize(() => { }))
      .subscribe(result => {
        if (result) {
          this.weather = result;
          this._changeDetectorRef.markForCheck();
        }
        else {
          // this.weatherStatus();
        }
      });
  }

  action(model: RocketVM, action: string): void {
    let ok = "Ok";
    let message: "Message";
    if (action == "telemetry") {
      this.dialogRef = this._matDialog.open(DetailsComponent, {
        disableClose: false,
        height: '430px',
        width: '720px',
        data: model
      });
      this._rockerService.telemetry(model).subscribe();
    }
    else {
      this.dialogRef = this._matDialog.open(ConfirmDialogComponent, {
        disableClose: false,
        width: '400px',
      });
      this.dialogRef.componentInstance.confirmMessage = "Do you " + action + "?";
    }
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

        switch (action) {
          case 'deploy':
            this.actions = this._rockerService.deployed(model.id);
            break;
          case 'cancel':
            this.actions = this._rockerService.launchedDelete(model.id);
            break;
          case 'launch':
            this.actions = this._rockerService.launchedPut(model.id);
            break;
        }

        this.actions.subscribe(res => {
          if (res.isSuccessful == true) {
            this._matSnackBar.open("Ok", ok, {
              verticalPosition: 'top',
              duration: 2000
            });
          }
          else {
            var restt =JSON.parse(JSON.parse(JSON.stringify(res.message)));
            this._matSnackBar.open(restt.message as string, ok, {
              verticalPosition: 'top',
              duration: 2000
            });
          }
        }, error => {
          if(error){
            this._matSnackBar.open(error, ok, {
              verticalPosition: 'top',
              duration: 2000
            });
          }
          
        }, () => {
        
          this.rocketList();
          this.weatherStatus();
        });
      }
      this.dialogRef = null;
    });
  }
}
