import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent {

  userRefreshNeeded = false;
  itemRefreshNeeded = false;

  onUserAdded() {
    this.userRefreshNeeded = true;
  }

  onItemAdded() {
    this.itemRefreshNeeded = true;
  }
}
