import {TestBed} from '@angular/core/testing';
import {NgCropperPlaygroundApp} from './NgCropperPlaygroundApp';
import {NxWelcome} from './nx-welcome';

describe('NgCropperPlaygroundApp', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgCropperPlaygroundApp, NxWelcome],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(NgCropperPlaygroundApp);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome NgCropper-playground'
    );
  });
});
