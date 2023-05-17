import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLoginComponent } from './start-login.component';

describe('StartLoginComponent', () => {
  let component: StartLoginComponent;
  let fixture: ComponentFixture<StartLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
