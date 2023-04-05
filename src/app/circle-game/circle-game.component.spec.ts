import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleGameComponent } from './circle-game.component';

describe('CircleGameComponent', () => {
  let component: CircleGameComponent;
  let fixture: ComponentFixture<CircleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
