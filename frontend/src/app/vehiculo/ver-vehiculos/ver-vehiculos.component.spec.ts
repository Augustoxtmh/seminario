import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVehiculosComponent } from './ver-vehiculos.component';

describe('VerVehiculosComponent', () => {
  let component: VerVehiculosComponent;
  let fixture: ComponentFixture<VerVehiculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerVehiculosComponent]
    });
    fixture = TestBed.createComponent(VerVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
