import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPGruasComponent } from './ver-pgruas.component';

describe('VerPGruasComponent', () => {
  let component: VerPGruasComponent;
  let fixture: ComponentFixture<VerPGruasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPGruasComponent]
    });
    fixture = TestBed.createComponent(VerPGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
