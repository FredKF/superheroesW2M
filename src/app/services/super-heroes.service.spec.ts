import { TestBed } from '@angular/core/testing';
import { SuperHeroesService } from './super-heroes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SuperHeroesService', () => {
  let service: SuperHeroesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SuperHeroesService],
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SuperHeroesService);
    httpTestingController = TestBed.get(HttpClientTestingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('getAll should make a GET HTTP request and return all data items', () => {
  // service.getAllProducts().subscribe( async res => {
  //   expect(res).toEqual(mockData); 
  //   expect(res.length).toBe(2); 
  //   }); 
  // const req = httpTestingController.expectOne('http://localhost:3000/products');
  // expect(req.request.method).toBe('GET');
  // expect(req.cancelled).toBeFalsy(); 
  // expect(req.request.responseType).toEqual('json');
  // req.flush(mockData);
  // httpTestingController.verify();
  // });


});
