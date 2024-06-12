import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/api/login';
  private signupUrl = 'http://localhost:3000/api/signup';
  private userItemsUrl = 'http://localhost:3000/api/home/items';
  private currentUser: any = null;
  private updateUserUrl!: string;
  private requestItemUrl!: string;
  private getUserIdUrl!: string;
  private returnItemUrl!: string;
  private getOneUserUrl!: string;

  constructor(private http: HttpClient) { }

  //@access: Staff
  signup(data: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, data);
  }

  //@access: Staff
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(this.loginUrl, loginData).pipe(
      tap(response => {
        const { token, _id, ...user } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
        this.updateUserUrl = `http://localhost:3000/api/home/account/${_id}`;
      })
    );
  }

  //@access: Staff
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  //@access: Staff
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  updateUser(updatedData: any): Observable<any> {
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    return this.getUserId().pipe(
      switchMap((data: any) => {
        this.updateUserUrl = `http://localhost:3000/api/home/account/${data.userId}`;
        console.log("url: ", this.updateUserUrl);
        return this.http.put<any>(this.updateUserUrl, updatedData, { headers });
      }),
      catchError(err => {
        console.error('Error updating user:', err);
        throw err;
      })
    );
  }
  //@access: Staff
  getCurrentUser() {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      console.log("stored user : ", storedUser)
      if (storedUser) {
        try {
          this.currentUser = JSON.parse(storedUser);
        } catch (error) {
          console.error('Error parsing currentUser from local storage', error);
          this.currentUser = null;
        }
      }
    }
    return this.currentUser;
  }

  //@access: Staff
  getUserId() : any {
    const userEmail = this.getCurrentUser().email;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    this.getUserIdUrl = 'http://localhost:3000/api/home/get-user-id';
    return this.http.post<any>(this.getUserIdUrl, {email: userEmail}, {headers});
  }

  //@access: Staff
  getItems(): Observable<any[]>
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.get<any[]>(this.userItemsUrl, {headers});
  }

  //@access: Staff
	requestItem(itemId: any, userId: any) : Observable<any>
	{
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`});
		this.requestItemUrl = `http://localhost:3000/api/home/items/request/${itemId}`;
		return this.http.post<any>(this.requestItemUrl, {userId: userId}, { headers });
	}

  //@access: Staff
  returnItem(itemId: any) : Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`});
    this.returnItemUrl = `http://localhost:3000/api/home/items/return/${itemId}`;
    return this.http.put<any>(this.returnItemUrl, null, { headers });
  }

  //@access: Admin
  getUserById(id: any) : Observable<any>
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`});
    this.getOneUserUrl = `http://localhost:3000/api/admin/getOneUser/${id}`;
    return this.http.get<any>(this.getOneUserUrl, { headers });
  }

}

