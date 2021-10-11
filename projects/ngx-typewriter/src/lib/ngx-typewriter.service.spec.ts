import { TestBed } from '@angular/core/testing';

import { NgxTypewriterService } from './ngx-typewriter.service';

describe('NgxTypewriterService', () => {
  let service: NgxTypewriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTypewriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
