// Angular Modules 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from './models/api-response';
import { UtilsService } from './utils/utils-service.service';
@Injectable()
export class ApiService {
    addBranch(url: string, data: { branch_Code: any; branch_Name: any; }) {
        throw new Error('Method not implemented.');
    }
     fetchOrders() {
        throw new Error("Method not implemented.");
    }
    // private DOMAIN_URL = "https://healthapi.nginfosolutions.com/";
    private DOMAIN_URL = "https://payrollapi.nginfosolutions.com/"; 

    constructor(
        // Angular Modules 
        private http: HttpClient,
        private util: UtilsService,
    ) { }
    public get(url: string): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(this.DOMAIN_URL + url);
    }
    public post(url: any, data: any) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'false' });
        return this.http.post(this.DOMAIN_URL + url, data);
    }
    public put(url: string, data: any, options?: any) {
        return this.http.put(url, data, options);
    }
    public delete(url: string, options?: any) {
        return this.http.delete(url, options);
    }

    login(url: any, email: any, password: any) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post<any>(this.DOMAIN_URL + url, {
            email: email,
            password: password
        }, { headers: reqHeader })
    }
    register(url: any, body: any) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post<any>(this.DOMAIN_URL + url, body,
            { headers: reqHeader })
    }
    upload_docs(url: any, formData: any) {

        const accessToken = this.util.decrypt_Text(localStorage.getItem('access_token'));

        var reqHeader = new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` });
        return this.http.post<any>(this.DOMAIN_URL + url, formData,
            { headers: reqHeader })
    }
    addEmployee(url: any, formData: any) {
        const accessToken = this.util.decrypt_Text(localStorage.getItem('access_token'));

        var reqHeader = new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` });
        return this.http.post<any>(this.DOMAIN_URL + url, formData,
            { headers: reqHeader })
    }
} 