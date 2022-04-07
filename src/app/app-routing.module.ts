import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [  
  {path: 'super-heroes', loadChildren:()=>import('./components/components.module' ).then(m => m.ComponentsModule)},
  {path: '', redirectTo:'/super-heroes', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
