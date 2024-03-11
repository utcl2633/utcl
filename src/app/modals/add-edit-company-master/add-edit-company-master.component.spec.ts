import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCompanyMasterComponent } from './add-edit-company-master.component';

describe('AddEditCompanyMasterComponent', () => {
  let component: AddEditCompanyMasterComponent;
  let fixture: ComponentFixture<AddEditCompanyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCompanyMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditCompanyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
