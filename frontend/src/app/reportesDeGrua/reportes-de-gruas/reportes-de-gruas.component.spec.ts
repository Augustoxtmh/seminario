import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesDeGruasComponent } from './reportes-de-gruas.component';

describe('ReportesDeGruasComponent', () => {
  let component: ReportesDeGruasComponent;
  let fixture: ComponentFixture<ReportesDeGruasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesDeGruasComponent]
    });
    fixture = TestBed.createComponent(ReportesDeGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
