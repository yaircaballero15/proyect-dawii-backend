import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBoletos } from './lista-boletos';

describe('ListaBoletos', () => {
  let component: ListaBoletos;
  let fixture: ComponentFixture<ListaBoletos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaBoletos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaBoletos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
