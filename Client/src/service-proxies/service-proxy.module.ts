import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ErrorInterceptor } from './error.interceptor';
import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RocketServiceProxy,
        ApiServiceProxies.WeatherServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ]
})
export class ServiceProxyModule { }
