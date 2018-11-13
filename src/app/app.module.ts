import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import * as fromServices from '../app/services';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
  ],
  providers: [...fromServices.services],
  bootstrap: [AppComponent]
})
export class AppModule { }
