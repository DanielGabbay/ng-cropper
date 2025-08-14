import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild, viewChildren } from '@angular/core';
import {
    CropperCanvasElement,
    CropperCrosshairElement,
    CropperGridElement,
    CropperHandleElement,
    CropperImageElement,
    CropperSelectionElement,
    CropperShadeElement,
    provideCropperJS,
} from '../providers/cropperjs.provider';

@Component({
    selector: 'ngCropper',
    imports: [],
    templateUrl: './NgCropper.html',
    styleUrl: './NgCropper.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgCropper {
    // ================== Element References ==================
    public readonly cropperCanvasRef = viewChild.required<ElementRef<CropperCanvasElement>>('cropperCanvas', { debugName: 'cropperCanvasRef' });
    public readonly cropperImageRef = viewChild.required<ElementRef<CropperImageElement>>('cropperImage', { debugName: 'cropperImageRef' });
    public readonly cropperShadeRef = viewChild.required<ElementRef<CropperShadeElement>>('cropperShade', { debugName: 'cropperShadeRef' });
    public readonly cropperHandleRefs = viewChildren<ElementRef<CropperHandleElement>>('cropperHandle', { debugName: 'cropperHandleRefs' });
    public readonly cropperSelectionRef = viewChild.required<ElementRef<CropperSelectionElement>>('cropperSelection', { debugName: 'cropperSelectionRef' });
    public readonly cropperGridRef = viewChild.required<ElementRef<CropperGridElement>>('cropperGrid', { debugName: 'cropperGridRef' });
    public readonly cropperCrosshairRef = viewChild.required<ElementRef<CropperCrosshairElement>>('cropperCrosshair', { debugName: 'cropperCrosshairRef' });

    constructor() {
        provideCropperJS().catch((err) => console.error('Cropper init failed', err));
    }
}
