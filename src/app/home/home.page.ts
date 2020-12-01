import { PageSharingDataService } from './../page-sharing-data.service';
import { MEALDB_Category, MEALDB_ListItem } from './../model';
import { MealdbApiService } from './../mealdb-api.service';
import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, DoCheck {

  area: string = '';

  meals: MEALDB_ListItem[] | null = null;
  categoryList: string[] = [];
  selectedCategory: string | null = null;

  constructor(
    private  mealDb: MealdbApiService,
    private pageSharingData: PageSharingDataService) {
    this.defineCategoryList();
  }

  ngOnInit() {
    this.pageSharingData.selectedArea.subscribe(area => this.area = area);
  }

  ngDoCheck() {
    if (this.area !== '') {
      this.getMealsByArea(this.area);
      this.area = '';
      this.clearSelection();
    }
  }

  defineCategoryList() {
    let categoryEnum = MEALDB_Category;
    this.categoryList = Object.values(categoryEnum);
  }

  getMealsByCategory(category: string) {
    this.mealDb.findByCategory(category)
    .subscribe((meals: any) => {
      this.meals = meals;
    });
  }

  getMealsByArea(area: string) {
    this.mealDb.findByArea(area)
    .subscribe((meals: any) => {
      this.meals = meals;
    });
  }

  selectCategory(event) {
    let selectedValue = event.detail.value;
    this.selectedCategory = selectedValue;
    this.getMealsByCategory(this.selectedCategory);
  }

  clearSelection() {
    this.selectedCategory = null;
  }

}
