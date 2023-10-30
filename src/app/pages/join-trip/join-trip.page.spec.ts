import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinTripPage } from './join-trip.page';

describe('JoinTripPage', () => {
  let component: JoinTripPage;
  let fixture: ComponentFixture<JoinTripPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JoinTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
