import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/shared/models/apiresponse.model';
import { environment } from 'src/environment/environment';
import { UserLogin } from '../models/user-login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  public save(user: User): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.endpoint, user);
  }

  public signin(userLogin: UserLogin): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.endpoint}/signin`, userLogin);
  }

  public findById(id: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.endpoint}/${id}`);
  }
}
