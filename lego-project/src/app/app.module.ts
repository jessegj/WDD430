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

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    ProjectPageComponent,
    ItemListComponent,
    LandingPageComponent,
    ProjectListComponent,
    InventoryModalComponent,
  ],
  imports: [
      BrowserModule,
      RouterModule.forRoot([
        {path: 'landing-page', component: LandingPageComponent},
        {path: 'project-page', component: ProjectPageComponent},
        {path: 'project-list', component: ProjectListComponent},
        {path: 'inventory', component: InventoryComponent},
        {path: '**', redirectTo: 'landing-page', pathMatch: 'full'}
      ]),
      BrowserAnimationsModule,
      ModalModule.forRoot(),
      FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
