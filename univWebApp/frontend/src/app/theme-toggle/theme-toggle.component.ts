import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button mat-icon-button (click)="toggleTheme()">
     <mat-icon>{{ isDarkMode ? 'wb_sunny' : 'nights_stay' }}</mat-icon>
    </button>
  `,
  styles: []
})
export class ThemeToggleComponent implements OnInit {


  isDarkMode : boolean = false;

  constructor(private themeService : ThemeService) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }



}
