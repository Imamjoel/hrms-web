import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router,
    private notificationService: NotificationService) {}
    returnUrl : string;
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   return this.isUserLoggedIn();
  // }

  // private isUserLoggedIn(): boolean {
  //   if (this.authenticationService.isUserLoggedIn()) {
  //     return true;
  //   }
  //   this.router.navigate(['/login'], { queryParams: { returnUrl: this.state.url }});
  //   this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
  //   return false;
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.isUserLoggedIn();
    if (currentUser) {
        // authorised so return true
         return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
    return false;
}
  
}
