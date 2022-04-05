import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "../shared/shared.module";
import { ComponentsRoutingModule } from "./components-routing.module";
import { EditSuperHeroComponent } from "./edit-super-hero/edit-super-hero.component";
import { SuperHeroDetailsComponent } from "./super-hero-details/super-hero-details.component";
import { SuperHeroesComponent } from "./super-heroes/super-heroes.component";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SuperHeroesComponent,
    SuperHeroDetailsComponent,
    EditSuperHeroComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    NgxPaginationModule,
    CommonModule,
    ComponentsRoutingModule,
    SharedModule,
    ReactiveFormsModule
    
  ],
  exports:[
    SuperHeroesComponent,
    SuperHeroDetailsComponent,
    EditSuperHeroComponent
  ]
  
})
export class ComponentsModule { }
