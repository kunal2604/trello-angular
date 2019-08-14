import { TestBed } from '@angular/core/testing';

import { GetChecklistsService } from './get-checklists.service';

describe('GetChecklistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetChecklistsService = TestBed.get(GetChecklistsService);
    expect(service).toBeTruthy();
  });
});
