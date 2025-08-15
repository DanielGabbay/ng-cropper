import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { NgCropper } from '../../public.api';
import { DEFAULT_TOOLBAR_ICONS, ToolbarToolType } from './data/default-toolbat-icons.const';
import { SafeHTMLPipe } from '../../pipes/safeHTML.pipe';

@Component({
    selector: 'ngCropperToolbar',
    standalone: true,
    imports: [NgTemplateOutlet, SafeHTMLPipe],
    templateUrl: './Toolbar.html',
    styleUrl: './Toolbar.scss',
})
export class Toolbar {
    /** Reference to the cropper instance to control it */
    public readonly cropperRef = input.required<NgCropper>();

    public readonly visibleTools = input(new Set(Object.keys(DEFAULT_TOOLBAR_ICONS) as ToolbarToolType[]), {
        transform: (value: Array<ToolbarToolType> | Set<ToolbarToolType>) => value instanceof Set ? value : new Set(value),
    });
    // ==== Rotate Left ====
    public readonly rotateLeftIcon = input<string | TemplateRef<unknown>>(DEFAULT_TOOLBAR_ICONS.rotateLeft);
    public readonly rotateLeftTooltip = input<string>('Rotate left 90°');
    // ==== Rotate Right ====
    public readonly rotateRightIcon = input<string | TemplateRef<unknown>>(DEFAULT_TOOLBAR_ICONS.rotateRight);
    public readonly rotateRightTooltip = input<string>('Rotate right 90°');
    // ==== Zoom In ====
    public readonly zoomInIcon = input<string | TemplateRef<unknown>>(DEFAULT_TOOLBAR_ICONS.zoomIn);
    public readonly zoomInTooltip = input<string>('Zoom in');
    // ==== Zoom Out ====
    public readonly zoomOutIcon = input<string | TemplateRef<unknown>>(DEFAULT_TOOLBAR_ICONS.zoomOut);
    public readonly zoomOutTooltip = input<string>('Zoom out');
    // ==== Crop ====
    public readonly cropIcon = input<string | TemplateRef<unknown>>(DEFAULT_TOOLBAR_ICONS.crop);
    public readonly cropTooltip = input<string>('Crop image');
    // ==== Reset ====
    public readonly resetIcon = input<string | TemplateRef<unknown>>(DEFAULT_TOOLBAR_ICONS.reset);
    public readonly resetTooltip = input<string>('Reset state');

    // Helper method to determine if icon is a template ref
    protected isTemplateRef(icon: string | TemplateRef<unknown>): icon is TemplateRef<unknown> {
        return icon instanceof TemplateRef;
    }

    // Helper method to determine if icon is a CSS class (starts with common CSS class patterns)
    protected isSvgIcon(icon: string | TemplateRef<unknown>): icon is string {
        return typeof icon === 'string' && icon.startsWith('<svg');
    }

    /** Rotate image 90 degrees clockwise */
    protected rotateClockwise() {
        this.cropperRef().rotateImage('90deg');
    }

    /** Rotate image 90 degrees counter-clockwise */
    protected rotateCounterClockwise() {
        this.cropperRef().rotateImage('-90deg');
    }

    /** Zoom in */
    protected zoomIn() {
        this.cropperRef().zoomImage(+0.1);
    }

    /** Zoom out */
    protected zoomOut() {
        this.cropperRef().zoomImage(-0.1);
    }

    /** Reset image to initial state */
    protected reset() {
        this.cropperRef().resetImageTransform();
        this.cropperRef().resetSelection();
        this.cropperRef().centerImage('contain');
    }

    /** Crop the selection */
    public async crop() {
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
