import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

	private getAllUserUrl: string = 'http://localhost:3000/api/admin/getAllUsers';
	private createOneUserUrl: string = 'http://localhost:3000/api/admin/createOneUser';
	private createOneItemUrl: string = 'http://localhost:3000/api/admin/createOneItem';
	private deleteOneUserUrl!: string;
	private deleteOneItemUrl!: string;
	private approveItemUrl!: string;
	
	constructor(private http : HttpClient) { }

	//@access: Admin
	getAllUsers() : Observable<any>
	{
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
		return this.http.get<any[]>(this.getAllUserUrl, {headers});
	}

	//@access: Admin
	createOneUser(data: any): Observable<any>
	{
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
		return this.http.post<any>(this.createOneUserUrl, data, { headers });
	}

	//@access: Admin
	createOneItem(data: any) : Observable<any>
	{
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
		return this.http.post<any>(this.createOneItemUrl, data, { headers });
	}

	//@access: Admin
	deleteOneUser(userId: any) : Observable<any>
	{
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
		this.deleteOneUserUrl = `http://localhost:3000/api/admin/deleteOneUser/${userId}`;
		return this.http.delete<any>(this.deleteOneUserUrl, { headers });
	}

	//@access: Admin
	deleteOneItem(itemId: any) : Observable<any>
	{
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
		this.deleteOneItemUrl = `http://localhost:3000/api/admin/deleteOneItem/${itemId}`;
		return this.http.delete<any>(this.deleteOneItemUrl, { headers });	
	}

	//@access: Admin
	approve(itemId: string, status: string) : Observable<any>
	{
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
		this.approveItemUrl = `http://localhost:3000/api/admin/items/approve/${itemId}`;
		return this.http.put<any>(this.approveItemUrl, {status : status}, { headers });
	}

}
