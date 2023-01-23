import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { zhCnLocale } from 'ngx-bootstrap/chronos';
import { observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/members';
import { PaginatedResult } from '../models/pagination';
import { User } from '../models/user';
import { UserParams } from '../models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User | undefined;
  userParams: UserParams | undefined;

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) {
          this.userParams = new UserParams;
          this.user = user;
        }
      }
    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  getMembers(userParams: UserParams) {
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    
    if(response) return of(response);

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    return getPaginatedResult<Member[]>(this.baseUrl +  'users', params, this.http).pipe(
      map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(pesel: string) {
    const member = this.members.find(x => x.pesel === pesel);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + pesel );
  }

  getDoctor(firstName: string, lastName: string) {
    const doctorLastName = this.members.find(x => x.lastName === lastName);
    const doctor = doctorLastName.pesel;

    console.log(doctor);

    if(doctorLastName.firstName === firstName) 
    {
      console.log("i got doctor");
      return;
    }
    if(doctorLastName.firstName !== firstName) {
      console.log("undefined doctor"); 
      return;
    }
    // if(doctor !== undefined) return of(doctor);
    // if (doctor.firstName !== firstName) return of(doctor);
    // const pesel = doctor.pesel;
    // return this.http.get<Member>(this.baseUrl + 'users/' + pesel );
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  deleteMember(member: Member) {
    return this.http.delete(this.baseUrl + 'users').pipe(
      map(() => {
      const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
}
