import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPolizaComponent } from './ver-poliza.component';

describe('VerPolizaComponent', () => {
  let component: VerPolizaComponent;
  let fixture: ComponentFixture<VerPolizaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPolizaComponent]
    });
    fixture = TestBed.createComponent(VerPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
