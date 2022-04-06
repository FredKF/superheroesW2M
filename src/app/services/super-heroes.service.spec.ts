import { TestBed } from '@angular/core/testing';
import { SuperHeroesService } from './super-heroes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MOCK_SUPER_HEROES } from '../models/mock/mock-super-heroes';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

describe('SuperHeroesService', () => {
  let service: SuperHeroesService;
  let httpTestingController: HttpTestingController;  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SuperHeroesService],
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SuperHeroesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => { 
    httpTestingController.verify(); 
   }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get all SuperHeroes should make a GET HTTP request and return all data items', () => {
  service.superHeroes$.subscribe( async res => {
    expect(res[0]).toEqual(MOCK_SUPER_HEROES[0]);    
    }); 
    const req = httpTestingController.expectOne('http://localhost:3000/superHeroes');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(MOCK_SUPER_HEROES);
    httpTestingController.verify();
  });

});
