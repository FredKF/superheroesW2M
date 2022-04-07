import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, combineLatest, EMPTY, map } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-super-hero-details',
  templateUrl: './super-hero-details.component.html',
})
export class SuperHeroDetailsComponent {
  animal: string;
  name: string;
  showId: number = 0;
  erroMessage = '';

  superHeroDetail$ = combineLatest([
    this.superHeoresService.superHeroes$,
    this.superHeoresService.heroSelectedAction$,
  ]).pipe(
    map(([superHeroes, selectedHeroId]) =>
      superHeroes.find((superHero) => superHero.id === selectedHeroId)
    ),
    catchError((err) => {
      this.erroMessage = err;
      return EMPTY;
    })
  );

  editHero(heroId: number): void {
    this.router.navigate(['super-heroes/edit', heroId]);
  }

  deleteSuperHero(heroId: number) {
    this.superHeoresService.deleteSuperHero(heroId).subscribe(() => {
      this.superHeoresService.heroSelectedListSubject.next('');
      this.superHeoresService.heroSelectedSubject.next(0);
    });
  }

  constructor(
    private superHeoresService: SuperHeroesService,
    private router: Router,
    public loader: LoaderService,
    public dialog: MatDialog
  ) {}

  openDeleteDialog(heroId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: false,
    });

    dialogRef.componentInstance.confirmMessage =
      'Are you sure you want to delete this superhero?';

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSuperHero(heroId);
      }
    });
  }
}
