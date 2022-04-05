import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHero } from 'src/app/models/super-hero/super-heroes.model';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

@Component({
  selector: 'app-edit-super-hero',
  templateUrl: './edit-super-hero.component.html',
  styleUrls: ['./edit-super-hero.component.css']
})
export class EditSuperHeroComponent implements OnInit {
  heroForm: FormGroup;
  newHero: SuperHero;
  heroUpdate: SuperHero;
  
  get name(){return this.heroForm.get('name');}
  get slug(){return this.heroForm.get('slug');}
  get id(){return this.heroForm.get('id');}

  constructor(private formBuilder: FormBuilder,
              private superHeroService: SuperHeroesService,
              private router: Router,
              private activeRouter: ActivatedRoute) { 
                this.heroForm = this.formBuilder.group({
                  id:['',Validators.required],
                  name:['',[Validators.required, Validators.minLength(2)]],
                  slug:['', Validators.required]
                });
              }

  ngOnInit(): void {

    const id = +this.activeRouter.snapshot.paramMap.get('id');
    this.superHeroService.getSuperHeroById(id).subscribe( res => {
      this.heroUpdate = res;      
      this.heroForm = this.formBuilder.group({
        id:[this.heroUpdate.id,Validators.required],
        name:[this.heroUpdate.name,[Validators.required, Validators.minLength(2)]],
        slug:[this.heroUpdate.slug, Validators.required]
      });
    });    
  }

  addNewHero(): void{    
    this.newHero = {
      id: this.heroForm.get("id").value,
      name: this.heroForm.get("name").value,
      slug: this.heroForm.get("slug").value
    }  
    console.log(this.newHero);
    this.superHeroService.addNewSuperHero(this.newHero).subscribe(()=>console.log(this.newHero));
    this.router.navigate(['/']);
  }

  confirmEdit(): void{     
    this.heroUpdate = {
      id: +this.heroForm.get('id').value,
      name: this.heroForm.get('name').value,
      slug: this.heroForm.get('slug').value,
    }
    this.superHeroService.updateSuperHero(this.heroUpdate).subscribe(()=>console.log(this.heroUpdate));
    this.router.navigate(['/']);
  }

  getSuperHeroData(id: number){    
    this.superHeroService.getSuperHeroById(id).subscribe(res =>{
      this.heroUpdate = res;      
    });    
  }
}
