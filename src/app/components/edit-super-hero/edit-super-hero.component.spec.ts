import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderService } from 'src/app/loader/loader.service';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

import { EditSuperHeroComponent } from './edit-super-hero.component';

describe('EditSuperHeroComponent', () => {
  let component: EditSuperHeroComponent;
  let fixture: ComponentFixture<EditSuperHeroComponent>;
  let superHeroesService: SuperHeroesService;
  let router: Router; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSuperHeroComponent ],
      imports:[HttpClientModule, RouterTestingModule],
      providers:[SuperHeroesService, LoaderService, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuperHeroComponent);
    component = fixture.componentInstance;
    superHeroesService = TestBed.get(SuperHeroesService);
    router = TestBed.get(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new item to collection', () => {      
    component.name.setValue('NEW_HERO');
    fixture.detectChanges();
    component.addNewHero();
    expect(component.newHero.name).toEqual('NEW_HERO');
  }); 
});
