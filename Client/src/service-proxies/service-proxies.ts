/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.15.7.0 (NJsonSchema v10.6.7.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming
// @ts-nocheck

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class RocketServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    getAll(): Observable<RocketVMArrayCustomResult> {
        let url_ = this.baseUrl + "/Rocket/get-all";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RocketVMArrayCustomResult>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RocketVMArrayCustomResult>;
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<RocketVMArrayCustomResult> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RocketVMArrayCustomResult.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<RocketVMArrayCustomResult>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    launchedPut(id: string | null | undefined): Observable<RocketVMCustomResult> {
        let url_ = this.baseUrl + "/Rocket/launched?";
        if (id !== undefined && id !== null)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processLaunchedPut(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processLaunchedPut(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RocketVMCustomResult>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RocketVMCustomResult>;
        }));
    }

    protected processLaunchedPut(response: HttpResponseBase): Observable<RocketVMCustomResult> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RocketVMCustomResult.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<RocketVMCustomResult>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    launchedDelete(id: string | null | undefined): Observable<RocketVMCustomResult> {
        let url_ = this.baseUrl + "/Rocket/launched?";
        if (id !== undefined && id !== null)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processLaunchedDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processLaunchedDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RocketVMCustomResult>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RocketVMCustomResult>;
        }));
    }

    protected processLaunchedDelete(response: HttpResponseBase): Observable<RocketVMCustomResult> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RocketVMCustomResult.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<RocketVMCustomResult>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    deployed(id: string | null | undefined): Observable<RocketVMCustomResult> {
        let url_ = this.baseUrl + "/Rocket/deployed?";
        if (id !== undefined && id !== null)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeployed(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeployed(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RocketVMCustomResult>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RocketVMCustomResult>;
        }));
    }

    protected processDeployed(response: HttpResponseBase): Observable<RocketVMCustomResult> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RocketVMCustomResult.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<RocketVMCustomResult>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    telemetry(body: RocketVM | undefined): Observable<RocketVMCustomResult> {
        let url_ = this.baseUrl + "/Rocket/telemetry";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processTelemetry(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processTelemetry(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RocketVMCustomResult>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RocketVMCustomResult>;
        }));
    }

    protected processTelemetry(response: HttpResponseBase): Observable<RocketVMCustomResult> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RocketVMCustomResult.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<RocketVMCustomResult>(null as any);
    }
}

@Injectable()
export class WeatherServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    get(): Observable<WeatherVM> {
        let url_ = this.baseUrl + "/Weather/get";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<WeatherVM>;
                }
            } else
                return _observableThrow(response_) as any as Observable<WeatherVM>;
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<WeatherVM> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = WeatherVM.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WeatherVM>(null as any);
    }
}

export class PayloadVM implements IPayloadVM {
    description!: string | undefined;
    weight!: number;

    constructor(data?: IPayloadVM) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.description = _data["description"];
            this.weight = _data["weight"];
        }
    }

    static fromJS(data: any): PayloadVM {
        data = typeof data === 'object' ? data : {};
        let result = new PayloadVM();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["description"] = this.description;
        data["weight"] = this.weight;
        return data;
    }
}

export interface IPayloadVM {
    description: string | undefined;
    weight: number;
}

export class TelemetryVM implements ITelemetryVM {
    host!: string | undefined;
    port!: number;

    constructor(data?: ITelemetryVM) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.host = _data["host"];
            this.port = _data["port"];
        }
    }

    static fromJS(data: any): TelemetryVM {
        data = typeof data === 'object' ? data : {};
        let result = new TelemetryVM();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["host"] = this.host;
        data["port"] = this.port;
        return data;
    }
}

export interface ITelemetryVM {
    host: string | undefined;
    port: number;
}

export class TimestampsVM implements ITimestampsVM {
    launched!: Date | undefined;
    deployed!: Date | undefined;
    failed!: Date | undefined;
    cancelled!: Date | undefined;

    constructor(data?: ITimestampsVM) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.launched = _data["launched"] ? new Date(_data["launched"].toString()) : <any>undefined;
            this.deployed = _data["deployed"] ? new Date(_data["deployed"].toString()) : <any>undefined;
            this.failed = _data["failed"] ? new Date(_data["failed"].toString()) : <any>undefined;
            this.cancelled = _data["cancelled"] ? new Date(_data["cancelled"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): TimestampsVM {
        data = typeof data === 'object' ? data : {};
        let result = new TimestampsVM();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["launched"] = this.launched ? this.launched.toISOString() : <any>undefined;
        data["deployed"] = this.deployed ? this.deployed.toISOString() : <any>undefined;
        data["failed"] = this.failed ? this.failed.toISOString() : <any>undefined;
        data["cancelled"] = this.cancelled ? this.cancelled.toISOString() : <any>undefined;
        return data;
    }
}

export interface ITimestampsVM {
    launched: Date | undefined;
    deployed: Date | undefined;
    failed: Date | undefined;
    cancelled: Date | undefined;
}

export class RocketVM implements IRocketVM {
    id!: string | undefined;
    model!: string | undefined;
    mass!: number;
    payload!: PayloadVM;
    telemetry!: TelemetryVM;
    status!: string | undefined;
    timestamps!: TimestampsVM;
    altitude!: number;
    speed!: number;
    acceleration!: number;
    thrust!: number;
    temperature!: number;

    constructor(data?: IRocketVM) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.model = _data["model"];
            this.mass = _data["mass"];
            this.payload = _data["payload"] ? PayloadVM.fromJS(_data["payload"]) : <any>undefined;
            this.telemetry = _data["telemetry"] ? TelemetryVM.fromJS(_data["telemetry"]) : <any>undefined;
            this.status = _data["status"];
            this.timestamps = _data["timestamps"] ? TimestampsVM.fromJS(_data["timestamps"]) : <any>undefined;
            this.altitude = _data["altitude"];
            this.speed = _data["speed"];
            this.acceleration = _data["acceleration"];
            this.thrust = _data["thrust"];
            this.temperature = _data["temperature"];
        }
    }

    static fromJS(data: any): RocketVM {
        data = typeof data === 'object' ? data : {};
        let result = new RocketVM();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["model"] = this.model;
        data["mass"] = this.mass;
        data["payload"] = this.payload ? this.payload.toJSON() : <any>undefined;
        data["telemetry"] = this.telemetry ? this.telemetry.toJSON() : <any>undefined;
        data["status"] = this.status;
        data["timestamps"] = this.timestamps ? this.timestamps.toJSON() : <any>undefined;
        data["altitude"] = this.altitude;
        data["speed"] = this.speed;
        data["acceleration"] = this.acceleration;
        data["thrust"] = this.thrust;
        data["temperature"] = this.temperature;
        return data;
    }
}

export interface IRocketVM {
    id: string | undefined;
    model: string | undefined;
    mass: number;
    payload: PayloadVM;
    telemetry: TelemetryVM;
    status: string | undefined;
    timestamps: TimestampsVM;
    altitude: number;
    speed: number;
    acceleration: number;
    thrust: number;
    temperature: number;
}

export class RocketVMArrayCustomResult implements IRocketVMArrayCustomResult {
    isSuccessful!: boolean;
    message!: string | undefined;
    datum!: RocketVM[] | undefined;

    constructor(data?: IRocketVMArrayCustomResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.isSuccessful = _data["isSuccessful"];
            this.message = _data["message"];
            if (Array.isArray(_data["datum"])) {
                this.datum = [] as any;
                for (let item of _data["datum"])
                    this.datum!.push(RocketVM.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RocketVMArrayCustomResult {
        data = typeof data === 'object' ? data : {};
        let result = new RocketVMArrayCustomResult();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isSuccessful"] = this.isSuccessful;
        data["message"] = this.message;
        if (Array.isArray(this.datum)) {
            data["datum"] = [];
            for (let item of this.datum)
                data["datum"].push(item.toJSON());
        }
        return data;
    }
}

export interface IRocketVMArrayCustomResult {
    isSuccessful: boolean;
    message: string | undefined;
    datum: RocketVM[] | undefined;
}

export class RocketVMCustomResult implements IRocketVMCustomResult {
    isSuccessful!: boolean;
    message!: string | undefined;
    datum!: RocketVM;

    constructor(data?: IRocketVMCustomResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.isSuccessful = _data["isSuccessful"];
            this.message = _data["message"];
            this.datum = _data["datum"] ? RocketVM.fromJS(_data["datum"]) : <any>undefined;
        }
    }

    static fromJS(data: any): RocketVMCustomResult {
        data = typeof data === 'object' ? data : {};
        let result = new RocketVMCustomResult();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isSuccessful"] = this.isSuccessful;
        data["message"] = this.message;
        data["datum"] = this.datum ? this.datum.toJSON() : <any>undefined;
        return data;
    }
}

export interface IRocketVMCustomResult {
    isSuccessful: boolean;
    message: string | undefined;
    datum: RocketVM;
}

export class PrecipitationVM implements IPrecipitationVM {
    probability!: number;
    rain!: boolean;
    snow!: boolean;
    sleet!: boolean;
    hail!: boolean;

    constructor(data?: IPrecipitationVM) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.probability = _data["probability"];
            this.rain = _data["rain"];
            this.snow = _data["snow"];
            this.sleet = _data["sleet"];
            this.hail = _data["hail"];
        }
    }

    static fromJS(data: any): PrecipitationVM {
        data = typeof data === 'object' ? data : {};
        let result = new PrecipitationVM();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["probability"] = this.probability;
        data["rain"] = this.rain;
        data["snow"] = this.snow;
        data["sleet"] = this.sleet;
        data["hail"] = this.hail;
        return data;
    }
}

export interface IPrecipitationVM {
    probability: number;
    rain: boolean;
    snow: boolean;
    sleet: boolean;
    hail: boolean;
}

export class WindVM implements IWindVM {
    direction!: string | undefined;
    angle!: number;
    speed!: number;

    constructor(data?: IWindVM) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.direction = _data["direction"];
            this.angle = _data["angle"];
            this.speed = _data["speed"];
        }
    }

    static fromJS(data: any): WindVM {
        data = typeof data === 'object' ? data : {};
        let result = new WindVM();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["direction"] = this.direction;
        data["angle"] = this.angle;
        data["speed"] = this.speed;
        return data;
    }
}

export interface IWindVM {
    direction: string | undefined;
    angle: number;
    speed: number;
}

export class WeatherVM implements IWeatherVM {
    temperature!: number;
    humidity!: number;
    pressure!: number;
    precipitation!: PrecipitationVM;
    wind!: WindVM;
    time!: Date;

    constructor(data?: IWeatherVM) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.temperature = _data["temperature"];
            this.humidity = _data["humidity"];
            this.pressure = _data["pressure"];
            this.precipitation = _data["precipitation"] ? PrecipitationVM.fromJS(_data["precipitation"]) : <any>undefined;
            this.wind = _data["wind"] ? WindVM.fromJS(_data["wind"]) : <any>undefined;
            this.time = _data["time"] ? new Date(_data["time"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): WeatherVM {
        data = typeof data === 'object' ? data : {};
        let result = new WeatherVM();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["temperature"] = this.temperature;
        data["humidity"] = this.humidity;
        data["pressure"] = this.pressure;
        data["precipitation"] = this.precipitation ? this.precipitation.toJSON() : <any>undefined;
        data["wind"] = this.wind ? this.wind.toJSON() : <any>undefined;
        data["time"] = this.time ? this.time.toISOString() : <any>undefined;
        return data;
    }
}

export interface IWeatherVM {
    temperature: number;
    humidity: number;
    pressure: number;
    precipitation: PrecipitationVM;
    wind: WindVM;
    time: Date;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}