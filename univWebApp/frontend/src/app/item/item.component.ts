import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { Observable, map, of, pipe, catchError } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnChanges {

  items: any[] = [];
  @Input() refresh!: boolean;
  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages!: number;
  requestedBy!: string;
  @Input() currentUserId!: any;
  searchTerm: string = ''; // Add search term property

  constructor(public authService: AuthService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refresh'] && changes['refresh'].currentValue) {
      this.getItems();
    }
  }

  getItems(): void {
    this.authService.getItems().subscribe(
      (data: any[]) => {
        this.items = data;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
        this.updatePaginatedItems();
      },
      (error) => {
        console.error('Error fetching items', error);
      }
    );
  }

  updatePaginatedItems(): void {
    const filteredItems = this.items.filter(item => item.type.toLowerCase().includes(this.searchTerm.toLowerCase())); // Filter items by search term
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = filteredItems.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(filteredItems.length / this.itemsPerPage); // Update total pages based on filtered items
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }

  requestItem(item: any): void {
    this.authService.getUserId().subscribe(
      (res: any) => {
        const userId = res.userId;
        this.authService.requestItem(item._id, userId).subscribe(
          (res) => {
            console.log('Item requested:', res);
            item.requestStatus = 'pending';
            item.requestedBy = userId;
          },
          (err) => {
            console.log('Request failed:', err);
          }
        );
      },
      (err: any) => {
        console.log("Operation failed : ", err);
      }
    );
  }

  isItemRequested(itemId: string): boolean {
    const item = this.items.find(i => i._id === itemId);
    return item.requestStatus === 'pending';
  }

  deleteOneItem(item: any) {
    this.adminService.deleteOneItem(item._id).subscribe(
      (res) => {
        console.log("One item deleted id: ", item._id);
        this.items = this.items.filter(u => u._id !== item._id);
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
        this.updatePaginatedItems();
      },
      (err) => {
        console.log("Operation failed", err);
      }
    );
  }

  onReturn(itemId: any) {
    this.authService.returnItem(itemId).subscribe(
      (res) => {
        console.log("Item was returned successfully", res);
        this.getItems();
      },
      (err) => {
        console.log("Operation failed :(", err);
      }
    );
  }

  getUserWithId(id: any): void {
    this.authService.getUserById(id).subscribe(
      (res) => {
        const user = res;
        this.requestedBy = user.name;
        const matchingItem = this.items.find(item => item.requestedBy === user._id);
        if (matchingItem) {
          matchingItem.requestedBy = user.name;
        }
      },
      (err) => {
        console.log("Operation failed :(", err);
      }
    );
  }
  
  // Method to handle search
  onSearchTermChange(): void {
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedItems();
  }
}
 
