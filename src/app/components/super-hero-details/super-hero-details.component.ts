import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, combineLatest, EMPTY, map } from 'rxjs';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

@Component({
  selector: 'app-super-hero-details',
  templateUrl: './super-hero-details.component.html',
  styleUrls: ['./super-hero-details.component.css']
})
export class SuperHeroDetailsComponent implements OnInit {
  
  showId: number = 0;
  erroMessage = "";

  private heroSelectedSubject = this.superHeoresService.heroSelectedSubject;
  heroSelectedAction$ = this.heroSelectedSubject.asObservable();

  superHeroDetail$ = combineLatest([
    this.superHeoresService.superHeroes$,
    this.heroSelectedAction$
  ])
  .pipe(
    map( ([superHeroes, selectedHeroId ])=>
      superHeroes.find(superHero => 
       superHero.id === selectedHeroId)
      ),
      catchError(err => {
        this.erroMessage = err;
        return EMPTY;
      })
  )  

  editHero(heroId: number){
    this.router.navigate(['super-heroes/edit', heroId]);
  }

  deleteSuperHero(heroId: number){
    this.superHeoresService.deleteSuperHero(heroId).subscribe(res => {
      console.log(res);
      this.superHeoresService.heroSelectedSubject.next(0);
    });
  }
  
  constructor(private superHeoresService: SuperHeroesService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.superHeoresService.heroSelectedSubject.subscribe(id => {
      this.showId = id;
      console.log(this.showId);
    });
  }
}
