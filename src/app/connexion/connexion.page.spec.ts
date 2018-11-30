import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionPage } from './connexion.page';

describe('ConnexionPage', () => {
  let component: ConnexionPage;
  let fixture: ComponentFixture<ConnexionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnexionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
