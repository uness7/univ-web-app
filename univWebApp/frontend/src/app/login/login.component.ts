// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router'
// import { AuthService } from '../auth.service';



// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   email: string = '';
//   password: string = '';

//   constructor(private router: Router, private authService : AuthService) {
//   }

//   ngOnInit(): void {
//   }

//   onSubmit() : void
//   {
//     this.authService.login(this.email, this.password).subscribe(
//       res => {
//         if (res.role === 'admin')
//         {
//           this.router.navigate(['/api/admin/dashboard']);        
//         }
//         else {
//           this.router.navigate(['/api/home']);
//         }          
//       },
//       err => {
//         console.log(err);
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.login(this.email, this.password).subscribe(
        res => {
          if (res.role === 'admin') {
            this.router.navigate(['/api/admin/dashboard']);
          } else {
            this.router.navigate(['/api/home']);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = 'Invalid login credentials. Please try again.';
        }
      );
    }
  }
}
