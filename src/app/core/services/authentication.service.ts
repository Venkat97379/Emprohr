import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsServiceService } from './util-service';
import { AppConstants } from './app-constants';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  api_url = AppConstants.API_BASE_URL;
  isAuthenticated = false;

  currentUserValue(): any {
    const user_data = this.util.decrypt_Text(localStorage.getItem('user_data') || '{}');
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(user_data || '{}'));

    return this.currentUserSubject.value;
  }


  constructor(private httpClient: HttpClient, public router: Router, public util: UtilsServiceService) {
    const user_data = this.util.decrypt_Text(localStorage.getItem('user_data') || '{}');
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(user_data || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  login(data: any) {
    return this.httpClient.post<any>(this.api_url + AppConstants.LOGIN, data)
  }


  getAccessToken() {
    const access_token = this.util.decrypt_Text(localStorage.getItem('access_token') || '');
    return access_token;
  }
  getUserId() {
    const uid = this.util.decrypt_Text(localStorage.getItem('user_id') || '');
    return uid;//encodeURIComponent(uid);
  }
  getUserName() {
    return this.util.decrypt_Text(localStorage.getItem('user_data') || '{}');

  }
  getUserInfo() {
    const userObj = this.util.decrypt_Text(localStorage.getItem('user_data') || '{}');
    const userInfo = JSON.parse(JSON.stringify(userObj));
    return userInfo;

  }
  checkAuthentication(): boolean {
    const currentUser = this.getUserName();
    if (currentUser == null || currentUser == undefined || currentUser == '') {

      return false;
    }
    return true;
  }
  logout() {
    localStorage.clear();
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['/auth/signin']);
    }
  }

  public isAuthorized(): boolean {
    const access_token = this.util.decrypt_Text(localStorage.getItem('access_token') || '');
    if (access_token != null) {
      return true;
    } else {
      return false;
    }
    // const user = this.currentUserValue();
    // if (user == null || user == undefined || (typeof user === 'object' && Object.keys(user).length === 0)) return false;
    // if (!user) return false;
    // //const allowed = allowedRoles.includes(user.role);
    // return true;
  }

  // public isAuthorized(allowedRoles: string[]): boolean {
  //   const user = this.currentUserValue();
  //   if (!user) return false;
  //   //const allowed = allowedRoles.includes(user.role);
  //   return true;
  // }
}











