import { PageSharingDataService } from './../page-sharing-data.service';
import { MealdbApiService } from './../mealdb-api.service';
import { MEALDB_Meal } from './../model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

interface Ingredient {
  name: string;
  measure: string;
}

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  area: string = '';

  meal: MEALDB_Meal | null = null;
  ingredients: Ingredient[] = [];

  constructor(
    private mealDb: MealdbApiService,
    private pageSharingData: PageSharingDataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let mealId: string = this.route.snapshot.paramMap.get('id');
    this.mealDb.findById(mealId)
      .pipe(
        tap(meal => this.ingredients = this.getIngredients(meal)),
        tap(meal => console.log(meal))
      )
      .subscribe(meal => this.meal = meal );

    this.pageSharingData.selectedArea.subscribe(area => this.area = area);
  }

  getYoutubeLink(meal: MEALDB_Meal): SafeResourceUrl {
    let videoId = meal.strYoutube.split('=')[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + videoId
    );
  }

  getIngredients(meal: MEALDB_Meal): Ingredient[] {
    let ingredients: Ingredient[] = [];
    for (let i: number = 1; i <= 20; i++) {
      let ingredientName: string = meal['strIngredient' + i];
      let ingredientMeasure: string = meal['strMeasure' + i];
      if (ingredientName !== '' && ingredientMeasure !== '') {
        let ingredient: Ingredient = {name: ingredientName, measure: ingredientMeasure};
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  }

  areaBadgeClick() {
    this.pageSharingData.changeArea(this.meal.strArea);
  }

}
