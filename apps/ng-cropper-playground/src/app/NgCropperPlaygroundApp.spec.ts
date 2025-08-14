import { TestBed } from '@angular/core/testing';
import { NgCropperPlaygroundApp } from './NgCropperPlaygroundApp';

describe('NgCropperPlaygroundApp', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [NgCropperPlaygroundApp],
        }).compileComponents();
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(NgCropperPlaygroundApp);
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });
});
