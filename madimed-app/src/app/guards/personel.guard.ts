import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class PersonelGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.accountService.currentUser$.pipe(
        map(user => {
          if(!user) return false;
          if(user.roles.includes('Personel') || user.roles.includes('Admin')) {
            return true;
          }else{
            this.toastr.error("You cannot enter this area!");
            this.route.navigateByUrl('/');
            return false;
          }
        })
      )
  }
  
}
