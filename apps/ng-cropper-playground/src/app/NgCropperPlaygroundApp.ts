import { Component } from '@angular/core';
import { NgCropper } from '@dg/ng-cropper';

@Component({
    imports: [NgCropper],
    selector: 'ngCropperPlaygroundApp',
    templateUrl: './NgCropperPlaygroundApp.html',
    styleUrl: './NgCropperPlaygroundApp.scss',
    schemas: [],
})
export class NgCropperPlaygroundApp {
    protected title = 'NgCropper-playground';
}
