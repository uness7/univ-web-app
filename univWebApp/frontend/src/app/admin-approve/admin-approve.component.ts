import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-approve',
  templateUrl: 'admin-approve.component.html',
  styleUrls: ['./admin-approve.component.css']
})
export class AdminApproveComponent implements OnInit {

  items: any[] = [];

  constructor(private authService : AuthService, private adminService : AdminService) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    this.authService.getItems().subscribe(
      (data: any[]) => {
        this.items = data.filter(item => item.requestStatus === 'pending');
      },
      (err) => {
        console.log("Operation failed :(");
      }
    );
  }

  approveRequest(itemId: string, status: string): void {
    this.adminService.approve(itemId, status).subscribe(
      (res) => {
        console.log(`Item request ${status}:`, res);
        this.items = this.items.filter(item => item._id !== itemId);
      },
      (err) => {
        console.log(`Failed to ${status} request:`, err);
      }
    );
  }

}
