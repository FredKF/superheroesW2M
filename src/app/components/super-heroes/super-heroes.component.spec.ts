import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderService } from 'src/app/loader/loader.service';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

import { SuperHeroesComponent } from './super-heroes.component';

describe('SuperHeroesComponent', () => {
  let component: SuperHeroesComponent;
  let fixture: ComponentFixture<SuperHeroesComponent>;
  let superHeroesService: SuperHeroesService;

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

    superHeroesService = TestBed.get(SuperHeroesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
