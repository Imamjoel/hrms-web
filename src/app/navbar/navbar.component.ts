import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { NotificationService } from '../service/notification.service';
import { AuthenticationService } from '../service/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public users: User[];
  public user: User;
  public refreshing: boolean;
  public selectedUser: User;
  public fileName: string;
  public profileImage: File;
  private subscriptions: Subscription[] = [];
  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getUsers(true);
  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
         
        },
        (errorResponse: HttpErrorResponse) => {
         this.refreshing = false;
        }
      )
    );
  }

  public onLogOut(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
