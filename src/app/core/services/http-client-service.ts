import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './authentication.service';
import { AppConstants } from './app-constants';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders(
    {

      'Content-Type': 'application/json',
    }
  )
};



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient, private authService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  get(url: string): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + url, httpOptions)
      .pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong.');
        })
      );
  }

  getwithAuth(url: string): Observable<any> {
    const authHttpOptions = {
      headers: new HttpHeaders(
        {
          'Authorization': 'Bearer ' + this.authService.getAccessToken(),
          'Content-Type': 'application/json',
        }
      )
    };
    return this.http.get(AppConstants.API_BASE_URL + url, authHttpOptions)
      .pipe(
        catchError(error => {
          if (error.status == 403) {
            this.toastr.error('Token Expired.', 'Access Denied');
            this.router.navigate(['/auth/signin']);
          }
          console.error('An error occurred:', error);
          console.error('An error occurred:', error);
          return throwError(error.error?.message == undefined ? error.error : error.error?.message);

        })
      );
  }
  getwithAuthWithParams(url: string, params: any): Observable<any> {
    const authHttpOptions = {
      params: params,
      headers: new HttpHeaders(
        {
          'Authorization': 'Bearer ' + this.authService.getAccessToken(),
          'Content-Type': 'application/json',
        }
      )
    };
    return this.http.get(AppConstants.API_BASE_URL + url, authHttpOptions)
      .pipe(
        catchError(error => {
          if (error.status == 403) {
            this.toastr.error('Token Expired.', 'Access Denied');
            this.router.navigate(['/auth/signin']);
          }
          console.error('An error occurred:', error);
          return throwError('Something went wrong.');
        })
      );
  }

  post(url: string, data: any): Observable<object> {
    const authHttpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        }
      )
    };
    return this.http.post(AppConstants.API_BASE_URL + url, data, authHttpOptions)
      .pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          return throwError(error.error?.message == undefined ? error.error : error.error?.message);
        })
      );
  }


  postWithAuth(url: string, data: any): Observable<object> {
    const authHttpOptions = {
      headers: new HttpHeaders(
        {
          'Authorization': 'Bearer ' + this.authService.getAccessToken(),
          'Content-Type': 'application/json',
        }
      )
    };
    return this.http.post(AppConstants.API_BASE_URL + url, data, authHttpOptions)
      .pipe(
        catchError(error => {
          console.log('An error occurred:', error.error);

          return throwError(error.error?.message == undefined ? error.error : error.error?.message);
        })
      );
  }


  postFormData(url: string, data: any): Observable<object> {
    const authHttpOptions = {
      headers: new HttpHeaders(
        {
          'Authorization': 'Bearer ' + this.authService.getAccessToken()
        }
      )
    };
    return this.http.post(AppConstants.API_BASE_URL + url, data, authHttpOptions)
      .pipe(
        catchError(error => {
          console.log('An error occurred:', error.error);

          return throwError(error.error?.message == undefined ? error.error : error.error?.message);
        })
      );
  }


  patch(url: string, data: any): Observable<object> {
    const authHttpOptions = {
      headers: new HttpHeaders(
        {
          'Authorization': 'Bearer ' + this.authService.getAccessToken(),
          'Content-Type': 'application/json',
        }
      )
    };
    return this.http.patch(AppConstants.API_BASE_URL + url, data, authHttpOptions)
      .pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          return throwError(error.error?.message == undefined ? error.error : error.error?.message);
        })
      );
  }

  //   private _listiner =new Subject<any>();
  //   listen():Observable<any>{
  //     return this._listiner.asObservable();
  //   }
  // filter(filterBy:string){
  //    this._listiner.next(filterBy)
  // }
}
