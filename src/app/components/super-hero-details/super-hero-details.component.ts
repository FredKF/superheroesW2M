import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, combineLatest, EMPTY, map } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

@Component({
  selector: 'app-super-hero-details',
  templateUrl: './super-hero-details.component.html',
  styleUrls: ['./super-hero-details.component.css']
})
export class SuperHeroDetailsComponent {
  
  showId: number = 0;
  erroMessage = "";

  superHeroDetail$ = combineLatest([
    this.superHeoresService.superHeroes$,
    this.superHeoresService.heroSelectedAction$
  ])
  .pipe(
    map(([superHeroes, selectedHeroId ])=>
      superHeroes.find(superHero => 
       superHero.id === selectedHeroId)
      ),
      catchError(err => {
        this.erroMessage = err;
        return EMPTY;
      })
  )

  editHero(heroId: number): void{
    this.router.navigate(['super-heroes/edit', heroId]);
  }

  deleteSuperHero(heroId: number){
    this.superHeoresService.deleteSuperHero(heroId).subscribe(() => {
      this.superHeoresService.heroSelectedListSubject.next(''); 
      this.superHeoresService.heroSelectedSubject.next(0);  
    });
  }
  
  constructor(private superHeoresService: SuperHeroesService,
              private router: Router,
              public loader: LoaderService) {
  }
  
}
