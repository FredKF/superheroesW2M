import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map } from 'rxjs';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';
import { LoaderService } from '../../loader/loader.service'

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrls: ['./super-heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuperHeroesComponent implements OnInit {

  page: any;
  errorMessage = "";
  showError: boolean;

  superHeroes$ = this.superHeroesService.superHeroes$
  .pipe(
    catchError((error: string) => {
      this.errorMessage = error;
      this.showError = true;
      return EMPTY;
    })
  );

  constructor(public loader: LoaderService,
              private superHeroesService: SuperHeroesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  filter(keyWord: string){
    this.superHeroes$ = this.superHeroesService.superHeroes$
    .pipe(
      map(superHeroes =>
          superHeroes.filter(superHero => 
            superHero.name.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
        ))
    )
  }

  newHero(){
    this.router.navigate(['super-heroes/edit']);
  } 

  heroDetails(heroId: number): void{
    this.superHeroesService.heroSelectedSubject.next(heroId);
  }

}
