import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageSharingDataService {

  private areaDefault = new BehaviorSubject('');
  selectedArea = this.areaDefault.asObservable();

  constructor() { }

  changeArea(area: string) {
    this.areaDefault.next(area);
  }

}
