import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPGruaComponent } from './ver-pgrua.component';

describe('VerPGruaComponent', () => {
  let component: VerPGruaComponent;
  let fixture: ComponentFixture<VerPGruaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPGruaComponent]
    });
    fixture = TestBed.createComponent(VerPGruaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
