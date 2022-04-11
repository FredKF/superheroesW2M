import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SuperHeroesComponent } from "../components/super-heroes/super-heroes.component";

const routes: Routes = [
   {path: '', component: SuperHeroesComponent }   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SharedRoutingModule{}