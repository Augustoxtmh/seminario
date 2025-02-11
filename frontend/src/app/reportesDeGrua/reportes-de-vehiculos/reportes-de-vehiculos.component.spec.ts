import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesDeVehiculosComponent } from './reportes-de-vehiculos.component';

describe('ReportesDeVehiculosComponent', () => {
  let component: ReportesDeVehiculosComponent;
  let fixture: ComponentFixture<ReportesDeVehiculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesDeVehiculosComponent]
    });
    fixture = TestBed.createComponent(ReportesDeVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
