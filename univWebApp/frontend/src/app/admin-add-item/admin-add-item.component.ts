import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { EventEmitter, Output } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-item',
  templateUrl: './admin-add-item.component.html',
  styleUrls: ['./admin-add-item.component.css']
})
export class AdminAddItemComponent implements OnInit {

   title: string = '';
   description: string = '';
   status: string = '';
   room : string = '';
   type: string = '';
   requestStatus: string = '';
   requestedBy : string = '';
   types: string[] = [
    'Office Tools',
    'IT Equipment',
    'Laboratory Equipment',
    'Classroom Supplies',
    'Furniture',
    'Books',
    'Audio/Visual Equipment'
  ];
  statusValues: string[] = [
    'stored',
    'used'
  ];
  selectedType: string;
  selectedStatus: string;
  roomValues: string[] = [];

  selectedRoom: string;
  @Output() itemAdded = new EventEmitter<void>();

  constructor(private adminServie: AdminService, private router : Router) {
    this.selectedType = this.types[0];   
    this.selectedStatus = this.statusValues[0]; 
    this.selectedRoom = this.roomValues[0];
  }

  ngOnInit(): void {
    this.title = '',
    this.description = '',
    this.type = '',
    this.status = '',
    this.room = '',
    this.requestStatus = '',
    this.requestedBy = '',
    this.fillRoomValues();
  }

  fillRoomValues(): void {
    for (let i = 200; i < 220; i++) {
      this.roomValues.push(i.toString());
    }
  }

  onSubmit() {
    const data = {
      title: this.title,
      type: this.type,
      description: this.description,
      status : this.status,
      room : this.room,
      requestStatus : this.requestStatus,
      requestedBy : this.requestedBy,
    };

    this.adminServie.createOneItem(data).subscribe(
      res => {
        console.log("One item was added to the database by current admin");
        this.itemAdded.emit();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/api/admin/dashboard']);
        });			
      },
      err => {
        console.log("Current operation failed !");
      }
    );
  }


}
