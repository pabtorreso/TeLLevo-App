<<<<<<< HEAD
import { ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
>>>>>>> 365552ef4f5321842223bc6c25b6388aeaab0201
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
