import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHero } from 'src/app/models/super-hero/super-heroes.model';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

@Component({
  selector: 'app-edit-super-hero',
  templateUrl: './edit-super-hero.component.html',
  styleUrls: ['./edit-super-hero.component.css'],
})
export class EditSuperHeroComponent implements OnInit {
  heroForm: FormGroup;
  newHero: SuperHero;
  heroUpdate: SuperHero;
  isAdd = false;
  image = '';

  get name() {
    return this.heroForm.get('name');
  }
  get slug() {
    return this.heroForm.get('slug');
  }
  get firstAppearance() {
    return this.heroForm.get('firstAppearance');
  }
  get placeOfBirth() {
    return this.heroForm.get('placeOfBirth');
  }
  get fullName() {
    return this.heroForm.get('fullName');
  }
  get occupation() {
    return this.heroForm.get('occupation');
  }

  constructor(
    private formBuilder: FormBuilder,
    private superHeroService: SuperHeroesService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.setInitialForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const id = +this.activeRouter.snapshot.paramMap.get('id');
    this.isAdd = id === 0;
    if (!this.isAdd) {
      this.superHeroService.getSuperHeroById(id).subscribe((res) => {
        this.heroUpdate = res;
        this.image = res.images.lg;
        this.heroForm = this.formBuilder.group({
          id: [this.heroUpdate.id],
          name: [
            this.heroUpdate.name,
            [Validators.required, Validators.minLength(2)],
          ],
          slug: [this.heroUpdate.slug, Validators.required],
          firstAppearance: [
            this.heroUpdate.biography.firstAppearance,
            Validators.required,
          ],
          placeOfBirth: [
            this.heroUpdate.biography.placeOfBirth,
            Validators.required,
          ],
          fullName: [this.heroUpdate.biography.fullName, Validators.required],
          occupation: [this.heroUpdate.work.occupation, Validators.required],
        });
      });
    }
  }

  setInitialForm(): void {
    this.heroForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      slug: ['', Validators.required],
      firstAppearance: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      fullName: ['', Validators.required],
      occupation: ['', Validators.required],
    });
  }

  addNewHero(): void {
    this.newHero = {
      name: this.heroForm.get('name').value,
      slug: this.heroForm.get('slug').value,
      work: {
        occupation: this.heroForm.get('occupation').value,
      },
      biography: {
        firstAppearance: this.heroForm.get('firstAppearance').value,
        placeOfBirth: this.heroForm.get('placeOfBirth').value,
        fullName: this.heroForm.get('fullName').value,
      },
      images: {
        sm: 'assets/default.png',
        lg: 'assets/default.png',
      },
    };

    this.superHeroService.addNewSuperHero(this.newHero).subscribe(() => {
      this.superHeroService.heroSelectedListSubject.next('');
      this.superHeroService.heroSelectedSubject.next(0);
    });
    this.router.navigate(['/']);
  }

  confirmEdit(): void {
    this.heroUpdate = {
      id: this.heroForm.get('id').value,
      name: this.heroForm.get('name').value,
      slug: this.heroForm.get('slug').value,
      work: {
        occupation: this.heroForm.get('occupation').value,
      },
      biography: {
        firstAppearance: this.heroForm.get('firstAppearance').value,
        placeOfBirth: this.heroForm.get('placeOfBirth').value,
        fullName: this.heroForm.get('fullName').value,
      },
    };
    this.superHeroService.updateSuperHero(this.heroUpdate).subscribe(() => {
      this.superHeroService.heroSelectedSubject.next(this.heroUpdate.id);
      this.superHeroService.heroSelectedListSubject.next('');
    });
    this.router.navigate(['/']);
  }

  getSuperHeroData(id: number) {
    this.superHeroService.getSuperHeroById(id).subscribe((res) => {
      this.heroUpdate = res;
    });
  }

  cancelAction() {
    this.heroForm.reset();
    this.router.navigate(['/']);
  }
}
