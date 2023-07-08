import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoRoomComponent } from './edit-info-room.component';

describe('EditInfoRoomComponent', () => {
  let component: EditInfoRoomComponent;
  let fixture: ComponentFixture<EditInfoRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfoRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInfoRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
