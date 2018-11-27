import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventPage } from './myEvent.page';

describe('MyEventPage', () => {
  let component: MyEventPage;
  let fixture: ComponentFixture<MyEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyEventPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
