import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <app-menu></app-menu>
  <router-outlet></router-outlet>
  <notifier-container></notifier-container>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hrmsMobile';
}
