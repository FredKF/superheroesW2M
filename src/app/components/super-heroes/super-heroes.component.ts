import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { SuperHero } from 'src/app/models/super-hero/super-heroes.model';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrls: ['./super-heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperHeroesComponent implements OnInit {
  page: any;
  errorMessage = '';
  hasErrors = false;
  superHeroes$: Observable<SuperHero[]>;  

  constructor(
    public loader: LoaderService,
    private superHeroesService: SuperHeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.superHeroesService.heroSelectedListSubject.subscribe(keyWord => {
      this.filter(keyWord);
    });
  }

  filter(keyWord: string): void {
    this.page = 1;
    this.superHeroes$ = this.superHeroesService.searchSuperHero(keyWord).pipe(
      catchError(err => {
        this.errorMessage = err;
        this.hasErrors = true;
        return EMPTY;
      })      
    );
    this.hasErrors = false;
  }

  newHero(): void {
    this.router.navigate(['super-heroes/edit']);
  }

  heroDetails(heroId: number): void {
    this.superHeroesService.heroSelectedSubject.next(heroId);
  }
}
