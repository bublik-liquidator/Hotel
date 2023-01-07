import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VhodComponent } from './vhod.component';

describe('VhodComponent', () => {
  let component: VhodComponent;
  let fixture: ComponentFixture<VhodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VhodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VhodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
