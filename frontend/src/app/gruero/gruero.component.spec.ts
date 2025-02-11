import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrueroComponent } from './gruero.component';

describe('GrueroComponent', () => {
  let component: GrueroComponent;
  let fixture: ComponentFixture<GrueroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrueroComponent]
    });
    fixture = TestBed.createComponent(GrueroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
