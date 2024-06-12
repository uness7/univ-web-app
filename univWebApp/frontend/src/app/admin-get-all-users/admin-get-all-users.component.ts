import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-admin-get-all-users',
  templateUrl: './admin-get-all-users.component.html',
  styleUrls: ['./admin-get-all-users.component.css']
})
export class AdminGetAllUsersComponent implements OnInit{

  @Input() refresh!: boolean;
  allUsers: any[] = [];

  constructor(private adminService : AdminService) {
  }

  ngOnInit() : void {
   this.fetchUsers();
  }


  fetchUsers() {
    this.adminService.getAllUsers().subscribe(
      (data: any[]) => {
        this.allUsers = data;
      }
      ,(err) => {
        console.log('Error fetching Users for admin panel', err);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refresh'] && changes['refresh'].currentValue) {
      this.fetchUsers();
    }
  }

  deleteUser(user: any) : void
  {
    this.adminService.deleteOneUser(user._id).subscribe(
      (res) => {
        console.log("One user got deleted : ", res)
        this.allUsers = this.allUsers.filter(u => u._id !== user._id);
      },
      (err) => {
        console.log("Operation failed : ", err);
      }
    );
  }



}
