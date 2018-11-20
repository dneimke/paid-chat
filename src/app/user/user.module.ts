import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRoutingModule } from './user-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  exports: [
    fromComponents.ProfileButtonComponent
  ]
})
export class UserModule { }
