import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPGruaComponent } from './modificar-pgrua.component';

describe('ModificarPGruaComponent', () => {
  let component: ModificarPGruaComponent;
  let fixture: ComponentFixture<ModificarPGruaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarPGruaComponent]
    });
    fixture = TestBed.createComponent(ModificarPGruaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
