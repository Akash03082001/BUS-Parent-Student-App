import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoReuseStrategy } from './no-reuse.strategy';

describe('NoReuseStrategy', () => {
  let component: NoReuseStrategy;
  let fixture: ComponentFixture<NoReuseStrategy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoReuseStrategy],
    }).compileComponents();

    fixture = TestBed.createComponent(NoReuseStrategy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
