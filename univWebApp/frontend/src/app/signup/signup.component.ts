import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  type: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const signupData = {
        name: this.name,
        email: this.email,
        password: this.password,
        type: this.type
      };

      this.authService.signup(signupData).subscribe(
        response => {
          console.log('Signup successful', response);
          this.router.navigate(['/api/login']);
        }, 
        error => {
          console.error('Signup failed', error);
          this.errorMessage = 'Signup failed. Please try again.';
        }
      );
    }
  }
}
