import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { VisitsListComponent } from './components/visits-list/visits-list.component';
import { VisitsComponent } from './components/visits/visits.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { PersonelGuard } from './guards/personel.guard';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailedResolver } from './resolvers/member-detailed.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, canActivate: [PersonelGuard] },
      {path: 'members/:pesel', component: MemberCardComponent, resolve: {member: MemberDetailedResolver}, canActivate: [PersonelGuard]  },
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard] },
      {path: 'visits-list', component: VisitsListComponent },
      {path: 'visits', component: VisitsComponent },
      {path: 'history', component: HistoryComponent },
      {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] }
    ]
  },
  {path: 'register', component: RegisterComponent },
  // {path: '/login-mobile', component:  },
  {path: 'errors', component: TestErrorsComponent },
  {path: 'not-found', component: NotFoundComponent },
  {path: 'server-error', component: ServerErrorComponent },
  {path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
