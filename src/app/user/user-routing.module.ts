import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from './containers';

const routes: Routes = [
  {path: 'user', component: fromContainers.ProfileComponent},
  {path: 'user/login', component: fromContainers.LoginComponent},
  {path: 'user/signout', component: fromContainers.SignoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
