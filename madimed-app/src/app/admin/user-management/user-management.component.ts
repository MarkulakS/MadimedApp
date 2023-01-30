import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
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
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = [
    'Admin',
    'Personel',
    'Member'
  ];

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getPersonelUsers();
  }

  getPersonelUsers() {
    this.adminService.getUsersWithRoles().subscribe({
      next: personel => this.personel = personel
    })
  }

  getMembersUsers() {
    this.adminService.getMembersUsers().subscribe({
      next: members => this.members = members
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
