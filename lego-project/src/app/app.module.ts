import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    ProjectPageComponent,
    ItemListComponent,
    LandingPageComponent,
  ],
  imports: [
      BrowserModule,
      RouterModule.forRoot([
        {path: 'inventory', component: InventoryComponent},
        {path: 'project-page', component: ProjectPageComponent},
        {path: 'landing-page', component: LandingPageComponent}
      ]),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
