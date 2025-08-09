import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateBlogComponent } from './admin-update-blog.component';

describe('AdminUpdateBlogComponent', () => {
  let component: AdminUpdateBlogComponent;
  let fixture: ComponentFixture<AdminUpdateBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpdateBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
