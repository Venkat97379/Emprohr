import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../core/services/authentication.service";


@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastrService) { }
  canActivate(
    next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRoles = next.data['roles'] as string[];
    //if (this.authService.isAuthorized(allowedRoles)) {
    if (this.authService.isAuthorized()) {
      return true;
    } else {
      //this.toastr.error("You dont have access to view this page. Please contact admin", "Not Authorized")
    }

    // Redirect to the login page or some other route
    this.router.navigate(['auth/login']);
    return false;
  }
}
