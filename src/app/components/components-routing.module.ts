import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditSuperHeroComponent } from "./edit-super-hero/edit-super-hero.component";
import { SuperHeroesComponent } from "./super-heroes/super-heroes.component";

const routes: Routes = [
   {path: '', component: SuperHeroesComponent },
   {path: 'edit', component: EditSuperHeroComponent},
   {path: 'edit/:id', component: EditSuperHeroComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ComponentsRoutingModule{}