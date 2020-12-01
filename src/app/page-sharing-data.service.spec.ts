import { TestBed } from '@angular/core/testing';

import { PageSharingDataService } from './page-sharing-data.service';

describe('PageSharingDataService', () => {
  let service: PageSharingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageSharingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
