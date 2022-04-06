import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { SuperHero } from 'src/app/models/super-hero/super-heroes.model';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

import { SuperHeroesComponent } from './super-heroes.component';

describe('SuperHeroesComponent', () => {
  let component: SuperHeroesComponent;
  let fixture: ComponentFixture<SuperHeroesComponent>;
  let superHeroesService: SuperHeroesService;
  let superHeroes: Observable<SuperHero[]>;
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
    superHeroes = new Observable<SuperHero[]>();

    superHeroesService = TestBed.get(SuperHeroesService);
    router = TestBed.get(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve an Observable response', () => {
    spyOn(superHeroesService, 'searchSuperHero')
    .and
    .callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(superHeroesService.searchSuperHero).toHaveBeenCalledWith('');
    expect(component.superHeroes$).toBeInstanceOf(Observable);
  });

   

  it('should return superheroes data collection', () =>{
    (<HTMLInputElement>document.getElementById('num1')).value = '2';
    document.getElementById('boton').click();
    expect((<HTMLInputElement>document.getElementById('result')).value ).toBe('4');
  });
});
