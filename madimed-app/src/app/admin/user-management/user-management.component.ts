import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  personel: User[] = [];
  members: User[] = [];
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = [
    'Admin',
    'Personel',
    'Member'
  ];
  pesel: string = '';

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users = users
    })
  }
  
  getUsersByPesel() {
    this.adminService.getUsersWithRolesByPesel(this.pesel).subscribe((user) => {
      this.users = user
      console.log(user);
    })
  }

  getPersonelUsers() {
    this.adminService.getPersonelUsers().subscribe((personel) => {
      this.personel = personel;
      this.users = personel;
    })
  }

  getMembersUsers() {
    this.adminService.getMembersUsers().subscribe((member) => {
      this.members = member;
      this.users = member;
    })
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        pesel: user.pesel,
        firstName: user.firstName,
        lastName: user.lastName,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles]
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content.selectedRoles;
        if(!this.arrayEqual(selectedRoles, user.roles)) {
          this.adminService.updateUserRoles(user.pesel, selectedRoles).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }

}
