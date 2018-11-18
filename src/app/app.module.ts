import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import * as fromServices from '../app/services';
import * as fromContainers from './containers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'home', component: fromContainers.HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: fromContainers.PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ...fromContainers.containers
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false }
    ),
    NgbModule.forRoot()
  ],
  providers: [...fromServices.services],
  bootstrap: [AppComponent]
})
export class AppModule { }
