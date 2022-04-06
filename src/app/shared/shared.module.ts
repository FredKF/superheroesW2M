import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SearchComponent } from "./search/search.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    SearchComponent,
    DeleteDialogComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    MatToolbarModule
  ],
  exports:[
    NotFoundComponent,
    SearchComponent    
  ]
  
})
export class SharedModule { }
