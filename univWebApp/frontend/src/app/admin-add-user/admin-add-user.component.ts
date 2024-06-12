import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})

export class AdminAddUserComponent {

	name: string = '';
	email: string = '';
	password: string = '';
	type: string = '';
	role: string = '';

	@Output() userAdded = new EventEmitter<void>();

	constructor(private adminService : AdminService, private router : Router) {
	}

	onSubmit() {
		const signupData = {
			name: this.name,
			email: this.email,
			password: this.password,
			type: this.type,
			role: this.role
		};
		this.adminService.createOneUser(signupData)
			.subscribe(
				res => {
					console.log("user Created : ", res.userCreated);		
					this.userAdded.emit();
					this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
						this.router.navigate(['/api/admin/dashboard']);
					});								
				},
				err => {
					console.log("User creation failed ", err);
				}
			);
	}
}
