import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }

  getUsersWithRolesByPesel(pesel: string) {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles/' + pesel);
  }

  getMembersUsers() {
    return this.http.get<User[]>(this.baseUrl + 'admin/members');
  }

  getPersonelUsers() {
    return this.http.get<User[]>(this.baseUrl + 'admin/personel');
  }

  updateUserRoles(pesel: string, roles: string[]) {
    return this.http.post<string[]>(this.baseUrl + 'admin/edit-roles/' + pesel + '?roles=' + roles, {});
  }


}
