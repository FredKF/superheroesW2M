import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SuperHeroesComponent } from './components/super-heroes/super-heroes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './loader/interceptor.service';
import { SuperHeroDetailsComponent } from './components/super-hero-details/super-hero-details.component';
import { EditSuperHeroComponent } from './components/edit-super-hero/edit-super-hero.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
