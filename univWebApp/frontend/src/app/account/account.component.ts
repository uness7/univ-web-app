import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  updateForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.updateForm = this.fb.group({
        name: [user.name, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        password: [''],
        type: [user.type, Validators.required]
      });
    } else {
      console.error('User data not available');
      this.router.navigate(['/api/login']);
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.loading = true;
      const formData = this.updateForm.value;
      if (!formData.password) {
        delete formData.password;
      }
      this.authService.updateUser(formData).subscribe(
        response => {
          console.log('User updated successfully', response);   
          this.successMessage = 'User updated successfully. Changes will appear after logging in again.';       
        },
        error => {
          console.error('Error updating user', error);
          this.errorMessage = 'Failed to update user. Please try again.';
        },
        () => this.loading = false
      );
    } else {
      console.error('Form is invalid:', this.updateForm.errors);
    }
  }
}
