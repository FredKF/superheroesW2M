import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable } from "rxjs";
import { SuperHero } from "../models/super-hero/super-heroes.model";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SuperHeroesService {

    heroSelectedSubject = new BehaviorSubject<number>(0);
    heroSelectedAction$ = this.heroSelectedSubject.asObservable();

    heroSelectedListSubject = new BehaviorSubject<string>("");
    heroSelectedListAction$ = this.heroSelectedListSubject.asObservable();
    
    constructor(private http: HttpClient){}

    superHeroes$ = this.http.get<SuperHero[]>(`${environment.apiUrl}/superHeroes`)
    .pipe(
        catchError(error =>{
          console.log(error);
          throw new Error('Could not retrieve data');
        })
    )

    searchSuperHero(keyWord: string) : Observable<SuperHero[]>{
      return this.http.get<SuperHero[]>(`${environment.apiUrl}/superHeroes?name_like=${keyWord}`)
      .pipe(
        catchError(error =>{
          console.log(error);
          throw new Error('Could not retrieve data');
        }))
    }

    addNewSuperHero(hero: SuperHero): Observable<SuperHero>{
      return this.http.post<SuperHero>(`${environment.apiUrl}/superHeroes`, hero)
      .pipe(
        catchError(error =>{
          console.log(error);
          throw new Error('Could not add data');
        }))
    }

    updateSuperHero(hero: SuperHero): Observable<SuperHero>{
      return this.http.patch<SuperHero>(`${environment.apiUrl}/superHeroes/${hero.id}`, hero)
      .pipe(
        catchError(error =>{
          console.log(error);
          throw new Error('Could not update data');
        }))
    } 

    getSuperHeroById(heroId: number): Observable<SuperHero>{
        return this.http.get<SuperHero>(`${environment.apiUrl}/superHeroes/${heroId}`)
        .pipe(
          catchError(error =>{
            console.log(error);
            throw new Error('Could not retrieve data');
          })
      );
    }

    deleteSuperHero(heroId: number): Observable<SuperHero>{
      return this.http.delete<SuperHero>(`${environment.apiUrl}/superHeroes/${heroId}`)
      .pipe(
        catchError(error => {
          console.log(error);
          throw new Error('Could not delete')
        })
      );
    }   
}