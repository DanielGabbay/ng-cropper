import { Component, input } from '@angular/core';
import { NgCropper } from '../../public.api';
import { LucideAngularModule, RotateCw, RotateCcw, Crop, ZoomIn, ZoomOut, RotateCcwSquare } from 'lucide-angular';

@Component({
    selector: 'ngCropperToolbar',
    imports: [LucideAngularModule],
    templateUrl: './Toolbar.html',
    styleUrl: './Toolbar.scss',
})
export class Toolbar {
    /** Reference to the cropper instance to control it */
    public readonly cropperRef = input.required<NgCropper>();

    // Icons for the toolbar
    readonly icons = {
        rotateCw: RotateCw,
        rotateCcw: RotateCcw,
        crop: Crop,
        zoomIn: ZoomIn,
        zoomOut: ZoomOut,
        reset: RotateCcwSquare,
    };

    /** Rotate image 90 degrees clockwise */
    rotateClockwise() {
        this.cropperRef().rotateImage('90deg');
    }

    /** Rotate image 90 degrees counter-clockwise */
    rotateCounterClockwise() {
        this.cropperRef().rotateImage('-90deg');
    }

    /** Zoom in */
    zoomIn() {
        this.cropperRef().zoomImage(+0.1);
    }

    /** Zoom out */
    zoomOut() {
        this.cropperRef().zoomImage(-0.1);
    }

    /** Reset image to initial state */
    reset() {
        this.cropperRef().resetImageTransform();
        this.cropperRef().resetSelection();
        this.cropperRef().centerImage('contain');
    }

    /** Crop the selection */
    async crop() {
        try {
            const canvas = await this.cropperRef().selectionToCanvas();
            // Create download link
            const link = document.createElement('a');
            link.download = 'cropped-image.png';
            link.href = canvas.toDataURL();
            link.click();
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    }
}
