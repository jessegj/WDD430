import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProjectPageComponent } from './project-page/project-page.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    ProjectPageComponent,
  ],
  imports: [
      BrowserModule,
      RouterModule.forRoot([
        {path: 'inventory', component: InventoryComponent},
        {path: 'project-page', component: ProjectPageComponent},
      ]),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
