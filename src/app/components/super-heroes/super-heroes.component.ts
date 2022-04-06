import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable } from 'rxjs';
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
  showError: boolean;
  superHeroes$: Observable<SuperHero[]>;
  showDetail = false;

  constructor(
    public loader: LoaderService,
    private superHeroesService: SuperHeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.superHeroesService.heroSelectedListSubject.subscribe(word => {
      this.filter(word);
    });
  }

  filter(keyWord: string) {
    this.superHeroes$ = this.superHeroesService.superHeroes$.pipe(
      map((superHeroes) =>
        superHeroes.filter((superHero) =>
          superHero.name
            .toLocaleLowerCase()
            .includes(keyWord.toLocaleLowerCase())
        )
      )
    );
  }

  newHero() {
    this.router.navigate(['super-heroes/edit']);
  }

  heroDetails(heroId: number): void {
    this.superHeroesService.heroSelectedSubject.next(heroId);
  }
}
