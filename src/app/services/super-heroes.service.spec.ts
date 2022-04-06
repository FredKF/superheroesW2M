import { TestBed } from '@angular/core/testing';
import { SuperHeroesService } from './super-heroes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MOCK_SUPER_HERO, MOCK_SUPER_HEROES } from '../models/mock/mock-super-heroes';
import { SuperHero } from '../models/super-hero/super-heroes.model';

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

  it('getSuperHeroById should make a GET HTTP request with id appended to end of url', () => {
        service.getSuperHeroById(1).subscribe( async res => {
          expect(res).toEqual(MOCK_SUPER_HERO)
         }); 
        const req = httpTestingController.expectOne('http://localhost:3000/superHeroes/1');
        expect(req.request.method).toBe('GET');
        expect(req.cancelled).toBeFalsy(); 
        expect(req.request.responseType).toEqual('json');
        req.flush(MOCK_SUPER_HERO);
        httpTestingController.verify();
  });

  it('delete should make a DELETE HTTP request with id appended to end of url', () => {
        service.deleteSuperHero(1).subscribe( async res => {
          expect(res).toBe(MOCK_SUPER_HERO); 
         }); 
        const req = httpTestingController.expectOne('http://localhost:3000/superHeroes/1', 'delete to api');
        expect(req.request.method).toBe('DELETE');
        expect(req.cancelled).toBeFalsy(); 
        expect(req.request.responseType).toEqual('json');
        req.flush(MOCK_SUPER_HERO);
        httpTestingController.verify();
  });

  it('updateSuperHero should make a PATCH HTTP request with id appended to end of url and resource as body', () => {
        const updateObj : SuperHero = { id:1, name: "newHeroName", slug:'newslug' };

        service.updateSuperHero(updateObj).subscribe(res => {
          expect(res.name).toBe("newHeroName"); 
        });        
        const req = httpTestingController.expectOne('http://localhost:3000/superHeroes/1', 'patch to api');
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toBe(updateObj);
        expect(req.cancelled).toBeFalsy(); 
        expect(req.request.responseType).toEqual('json');
        req.flush(updateObj);
        httpTestingController.verify();
  });

  it('addNewSuperHero should make a POST HTTP request with resource as body', () => {
        const addObj : SuperHero = { id: 1, name: "newHeroName", slug:'newslug' };
        service.addNewSuperHero(addObj).subscribe(res => {
          expect(res).toBe(addObj); 
         }); 
        const req = httpTestingController.expectOne('http://localhost:3000/superHeroes', 'post to api');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(addObj);
        expect(req.cancelled).toBeFalsy(); 
        expect(req.request.responseType).toEqual('json');
        req.flush(addObj);
        httpTestingController.verify();
  });

});
