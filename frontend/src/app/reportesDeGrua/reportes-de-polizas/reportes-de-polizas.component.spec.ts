import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesDePolizasComponent } from './reportes-de-polizas.component';

describe('ReportesDePolizasComponent', () => {
  let component: ReportesDePolizasComponent;
  let fixture: ComponentFixture<ReportesDePolizasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesDePolizasComponent]
    });
    fixture = TestBed.createComponent(ReportesDePolizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
