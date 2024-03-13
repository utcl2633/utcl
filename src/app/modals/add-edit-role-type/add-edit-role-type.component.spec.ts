import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRoleTypeComponent } from './add-edit-role-type.component';

describe('AddEditRoleTypeComponent', () => {
  let component: AddEditRoleTypeComponent;
  let fixture: ComponentFixture<AddEditRoleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRoleTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditRoleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
