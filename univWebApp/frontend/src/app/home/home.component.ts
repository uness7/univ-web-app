import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  template: `
    <mat-tab-group>        
        <mat-tab label="Items">          
          <app-item [currentUserId]="this.currentUserId?.userId"></app-item>
        </mat-tab>
      </mat-tab-group>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit{ 

  currentUserId!: any;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.getCurrentUserId();
  }

  
  getCurrentUserId(): void {
    this.authService.getUserId().subscribe(
      (userId: string | null) => {
        this.currentUserId = userId;
        console.log(userId);
        console.log("current user id", this.currentUserId);
      },
      (error: any) => {
        console.error('Error fetching current user ID', error);
        this.currentUserId = null;
      }
    );
  }
}
