import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsComputerComponent } from './vs-computer.component';

describe('VsComputerComponent', () => {
  let component: VsComputerComponent;
  let fixture: ComponentFixture<VsComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VsComputerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
