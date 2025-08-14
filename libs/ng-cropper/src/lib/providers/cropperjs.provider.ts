import { NgElement, WithProperties } from '@angular/elements';
import {
    CropperCanvas,
    CropperCrosshair,
    CropperGrid,
    CropperHandle,
    CropperImage,
    CropperSelection,
    CropperShade,
} from 'cropperjs';

// ============================== types ==============================
export type CropperCanvasElement = NgElement & WithProperties<CropperCanvas>;
export type CropperImageElement = NgElement & WithProperties<CropperImage>;
export type CropperShadeElement = NgElement & WithProperties<CropperShade>;
export type CropperHandleElement = NgElement & WithProperties<CropperHandle>;
export type CropperSelectionElement = NgElement & WithProperties<CropperSelection>;
export type CropperGridElement = NgElement & WithProperties<CropperGrid>;
export type CropperCrosshairElement = NgElement & WithProperties<CropperCrosshair>;

// ============================== global definitions ==============================
declare global {
    interface HTMLElementTagNameMap {
        'cropper-canvas': CropperCanvasElement;
        'cropper-image': CropperImageElement;
        'cropper-shade': CropperShadeElement;
        'cropper-handle': CropperHandleElement;
        'cropper-selection': CropperSelectionElement;
        'cropper-grid': CropperGridElement;
        'cropper-crosshair': CropperCrosshairElement;
    }
}

// ============================== Provider ==============================

let loaded = false;
export async function provideCropperJS() {
    if (!loaded) {
        await import('cropperjs');
        // customElements.define('cropper-canvas', CropperCanvas);
        // customElements.define('cropper-image', CropperImage);
        // customElements.define('cropper-shade', CropperShade);
        // customElements.define('cropper-handle', CropperHandle);
        // customElements.define('cropper-selection', CropperSelection);
        // customElements.define('cropper-grid', CropperGrid);
        // customElements.define('cropper-crosshair', CropperCrosshair);
        loaded = true;
    }
}
