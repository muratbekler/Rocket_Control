import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { environment } from 'environments/environment';
import { ErrorInterceptor } from './error.interceptor';
import { API_BASE_URL } from './service-proxies';
import { ServiceProxyModule } from './service-proxy.module';

@NgModule({
    declarations: [

    ],
    imports: [
        HttpClientModule,
        ServiceProxyModule,
    ],
    providers: [
        { provide: API_BASE_URL, useValue: environment.apiurl },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ]
})
@Injectable()
export class ServiceModule {
}
