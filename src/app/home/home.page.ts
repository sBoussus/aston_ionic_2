import { PageSharingDataService } from './../page-sharing-data.service';
import { MEALDB_Category, MEALDB_ListItem } from './../model';
import { MealdbApiService } from './../mealdb-api.service';
import { Component, DoCheck, OnChanges, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, DoCheck {

  meals: MEALDB_ListItem[] | null = null;
  categoryList: string[] = [];
  area: string = '';
  @ViewChild('selectedCategory', { static: false }) selectedCategory: IonSelect;

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
      this.selectedCategory.value = '';
      this.getMealsByArea(this.area);
      this.pageSharingData.changeArea('');
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
    this.selectedCategory.value = selectedValue;
    this.getMealsByCategory(this.selectedCategory.value);
  }

}
