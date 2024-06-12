import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public currentUser: any = this.authService.getCurrentUser();
  constructor(public authService: AuthService, private router : Router) { }

  onLogout()
  {
    this.authService.logout();
    this.router.navigate(['/api/login']);
  }

  getCurrentUserRole() : string {
    return this.authService.getCurrentUser().role;
  }

  onDarkMode() : void {
    console.log("dark mode");
  }

}
