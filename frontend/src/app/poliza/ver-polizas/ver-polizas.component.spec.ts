import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPolizasComponent } from './ver-polizas.component';

describe('VerPolizasComponent', () => {
  let component: VerPolizasComponent;
  let fixture: ComponentFixture<VerPolizasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPolizasComponent]
    });
    fixture = TestBed.createComponent(VerPolizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
