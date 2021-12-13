import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InventoryModalComponent } from './inventory-modal/inventory-modal.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseTSApp } from 'firebasets/firebasetsapp/FirebaseTSApp'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProjectDataComponent } from './project-data/project-data.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    ProjectPageComponent,
    ItemListComponent,
    LandingPageComponent,
    ProjectListComponent,
    InventoryModalComponent,
    ProjectDataComponent,
  ],
  imports: [
      BrowserModule,
      RouterModule.forRoot([
        {path: 'landing-page', component: LandingPageComponent},
        {path: 'project-page', component: ProjectPageComponent},
        {path: 'project-page/:id', component: ProjectPageComponent},
        {path: 'project-list', component: ProjectListComponent},
        {path: 'inventory', component: InventoryComponent},
        {path: '**', redirectTo: 'project-page', pathMatch: 'full'}
      ]),
      BrowserAnimationsModule,
      HttpClientModule,
      ModalModule.forRoot(),
      FormsModule,
      provideFirebaseApp(() => initializeApp (environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      BsDatepickerModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    FirebaseTSApp.init(environment.firebaseConfig)
  }
 }