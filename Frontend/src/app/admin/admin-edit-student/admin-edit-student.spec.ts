import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditStudent } from './admin-edit-student';

describe('AdminEditStudent', () => {
  let component: AdminEditStudent;
  let fixture: ComponentFixture<AdminEditStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditStudent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
