import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgCropper } from './NgCropper';

describe('NgCropper', () => {
  let component: NgCropper;
  let fixture: ComponentFixture<NgCropper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgCropper],
    }).compileComponents();

    fixture = TestBed.createComponent(NgCropper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
