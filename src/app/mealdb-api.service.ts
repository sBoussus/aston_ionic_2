import { MEALDB_Category, MEALDB_ListItem, MEALDB_Meal } from './model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API = {
  ROOT: 'https://www.themealdb.com/api/json/v1/1/',
  get FILTER_CATEGORY() {
    return this.ROOT + 'filter.php?c=';
  },
  get FILTER_AREA() {
    return this.ROOT + 'filter.php?a=';
  },
  get LOOKUP() {
    return this.ROOT + 'lookup.php?i=';
  }
};


@Injectable({
  providedIn: 'root'
})
export class MealdbApiService {

  constructor(private http: HttpClient) {  }

  findByCategory(categoryName: string): Observable<MEALDB_ListItem> {
    return this.http
      .get(API.FILTER_CATEGORY + categoryName)
      .pipe(
        map((res: any) => res.meals)
      );
  }

  findByArea(areaName: string): Observable<MEALDB_ListItem> {
    return this.http
      .get(API.FILTER_AREA + areaName)
      .pipe(
        map((res: any) => res.meals)
      );
  }

  findById(mealId: string): Observable<MEALDB_Meal> {
    return this.http
      .get(API.LOOKUP + mealId)
      .pipe(
        map((res: any) => res.meals[0])
      );
  }

}
