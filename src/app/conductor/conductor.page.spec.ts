import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorPage } from './conductor.page';

describe('ConductorPage', () => {
  let component: ConductorPage;
  let fixture: ComponentFixture<ConductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
