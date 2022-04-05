import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SuperHeroDetailsComponent } from "./super-hero-details/super-hero-details.component";
import { SuperHeroesComponent } from "./super-heroes/super-heroes.component";

const routes: Routes = [
   {path: '', component: SuperHeroesComponent },
   {path: ':id', component: SuperHeroDetailsComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ComponentsRoutingModule{}