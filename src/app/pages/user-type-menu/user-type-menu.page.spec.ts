import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTypeMenuPage } from './user-type-menu.page';

describe('UserTypeMenuPage', () => {
  let component: UserTypeMenuPage;
  let fixture: ComponentFixture<UserTypeMenuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserTypeMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
