import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { SuperHero } from "../models/super-hero/super-heroes.model";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SuperHeroesService {

    heroSelectedSubject = new BehaviorSubject<number>(0);
    
    constructor(private http: HttpClient){}

    superHeroes$ = this.http.get<SuperHero[]>(`${environment.apiUrl}/superHeroes`)
    .pipe(
        catchError(error =>{
          console.log(error);
          throw new Error('Could not retrieve data');
        })
    )

    addNewSuperHero(hero: SuperHero){
      return this.http.post(`${environment.apiUrl}/superHeroes`, hero)
      .pipe(
        catchError(error =>{
          console.log(error);
          throw new Error('Could not retrieve data');
        }))
    }

    updateSuperHero(hero: SuperHero){
      return this.http.put(`${environment.apiUrl}/superHeroes/${hero.id}`, hero)
      .pipe(
        catchError(error =>{
          console.log(error);
          throw new Error('Could not retrieve data');
        }))
    } 

    getSuperHeroById(heroId: number): Observable<SuperHero>{
        return this.http.get<SuperHero>(`${environment.apiUrl}/superHeroes/${heroId}`);
    }

    deleteSuperHero(heroId: number){
      return this.http.delete<SuperHero>(`${environment.apiUrl}/superHeroes/${heroId}`);
    }
}