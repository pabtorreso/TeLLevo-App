import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasajeroPage } from './pasajero.page';

describe('PasajeroPage', () => {
  let component: PasajeroPage;
  let fixture: ComponentFixture<PasajeroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
