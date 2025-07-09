import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {


  constructor(private httpClient: HttpClient, private toastrService: ToastrService) { }




  public post<T>(url: string, object: T): Observable<T> {

    return this.httpClient.post<T>(url, object);
  }
  //   public put(url: string, object: any): Observable<any> {

  //     return this.httpClient.put(url, object);
  // }

  public get(url: string): Observable<object> {

    return this.httpClient.get(url);
  }
  //   public delete(url: string): Observable<any> {

  //     return this.httpClient.delete(url);
  // }


  encrypt_Text(data: string) {
    if (data == null) {
      return null;
    }

    const output = CryptoJS.AES.encrypt(data, "heart$saver@123!").toString();
    return output;
  }
  decrypt_Text(data: string) {
    if (data == null) {
      return null;
    }

    const output = CryptoJS.AES.decrypt(data, "heart$saver@123!").toString(CryptoJS.enc.Utf8);
    return output;
  }

}
