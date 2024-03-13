import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRoleMasterComponent } from './add-edit-role-master.component';

describe('AddEditRoleMasterComponent', () => {
  let component: AddEditRoleMasterComponent;
  let fixture: ComponentFixture<AddEditRoleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRoleMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditRoleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
