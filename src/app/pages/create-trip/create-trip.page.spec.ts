import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTripPage } from './create-trip.page';

describe('CreateTripPage', () => {
  let component: CreateTripPage;
  let fixture: ComponentFixture<CreateTripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
