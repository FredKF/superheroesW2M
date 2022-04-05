import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';
import { LoaderService } from '../../loader/loader.service'

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrls: ['./super-heroes.component.css']
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
              private superHeroesService: SuperHeroesService) { }

  ngOnInit(): void {
  }

}
