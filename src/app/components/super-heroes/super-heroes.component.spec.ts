import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { MOCK_SUPER_HEROES } from 'src/app/models/mock/mock-super-heroes';
import { SuperHero } from 'src/app/models/super-hero/super-heroes.model';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

import { SuperHeroesComponent } from './super-heroes.component';

describe('SuperHeroesComponent', () => {
  let component: SuperHeroesComponent;
  let fixture: ComponentFixture<SuperHeroesComponent>;
  let superHeroesService: SuperHeroesService;
  let superHeroesObs: Observable<SuperHero[]>;
  let router: Router;  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperHeroesComponent ],
      imports:[HttpClientModule, RouterTestingModule],
      providers:[SuperHeroesService, LoaderService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeroesComponent);
    component = fixture.componentInstance;
    superHeroesObs = new Observable<SuperHero[]>(); 

    superHeroesService = TestBed.get(SuperHeroesService);
    router = TestBed.get(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve an Observable response', () => {
    spyOn(superHeroesService, 'searchSuperHero').and.callThrough();
    fixture.detectChanges();
    component.ngOnInit();
    expect(superHeroesService.searchSuperHero).toHaveBeenCalledWith('');
    expect(component.superHeroes$).toBeInstanceOf(Observable);
  });

  it('should filter the superheroes list by keyword', () => {
    spyOn(superHeroesService, 'searchSuperHero').and.returnValue(of(MOCK_SUPER_HEROES))
    fixture.detectChanges();
    component.ngOnInit();
    component.filter("bat");
    expect(superHeroesService.searchSuperHero).toHaveBeenCalledWith("bat"); 
  });  
});


