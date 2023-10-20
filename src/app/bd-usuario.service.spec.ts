import { TestBed } from '@angular/core/testing';

import { BDUsuarioService } from './bd-usuario.service';

describe('BDUsuarioService', () => {
  let service: BDUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BDUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
