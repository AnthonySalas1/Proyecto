import { TestBed } from '@angular/core/testing';

import { CargaServiceService } from './carga-service.service';

describe('CargaServiceService', () => {
  let service: CargaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
