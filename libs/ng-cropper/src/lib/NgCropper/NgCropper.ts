import { AfterViewInit, ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, input, viewChild, viewChildren } from '@angular/core';
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
export class NgCropper implements AfterViewInit {
    // ================== Element References ==================
    public readonly cropperCanvasRef = viewChild.required<ElementRef<CropperCanvasElement>>('cropperCanvas', { debugName: 'cropperCanvasRef' });
    public readonly cropperImageRef = viewChild.required<ElementRef<CropperImageElement>>('cropperImage', { debugName: 'cropperImageRef' });
    public readonly cropperShadeRef = viewChild.required<ElementRef<CropperShadeElement>>('cropperShade', { debugName: 'cropperShadeRef' });
    public readonly cropperHandleRefs = viewChildren<ElementRef<CropperHandleElement>>('cropperHandle', { debugName: 'cropperHandleRefs' });
    public readonly cropperSelectionRef = viewChild.required<ElementRef<CropperSelectionElement>>('cropperSelection', { debugName: 'cropperSelectionRef' });
    public readonly cropperGridRef = viewChild.required<ElementRef<CropperGridElement>>('cropperGrid', { debugName: 'cropperGridRef' });
    public readonly cropperCrosshairRef = viewChild.required<ElementRef<CropperCrosshairElement>>('cropperCrosshair', { debugName: 'cropperCrosshairRef' });

    // ================== Canvas Inputs ==================
    canvasHidden = input<boolean>(false);
    canvasBackground = input<boolean>(true);
    canvasDisabled = input<boolean>(false);
    canvasScaleStep = input<number>(0.1);
    canvasThemeColor = input<string>('#3399ff');

    // ================== Image Inputs ==================
    imageHidden = input<boolean>(false);
    imageRotatable = input<boolean>(true);
    imageScalable = input<boolean>(true);
    imageSkewable = input<boolean>(true);
    imageTranslatable = input<boolean>(true);
    imageInitialCenterSize = input<'contain' | 'cover' | 'none'>('contain');
    imageSrc = input<string>('https://picsum.photos/800/600');
    imageAlt = input<string>('The image to crop');

    // ================== Shade Inputs ==================
    shadeHidden = input<boolean>(false);
    shadeThemeColor = input<string>('rgba(0, 0, 0, 0.65)');

    // ================== Selection Inputs ==================
    selectionHidden = input<boolean>(false);
    selectionX = input<number>(0);
    selectionY = input<number>(0);
    selectionWidth = input<number>(0);
    selectionHeight = input<number>(0);
    selectionAspectRatio = input<number>(NaN);
    selectionInitialAspectRatio = input<number>(NaN);
    selectionInitialCoverage = input<number>(0.5);
    selectionDynamic = input<boolean>(false);
    selectionMovable = input<boolean>(true);
    selectionResizable = input<boolean>(true);
    selectionZoomable = input<boolean>(false);
    selectionMultiple = input<boolean>(false);
    selectionKeyboard = input<boolean>(false);
    selectionOutlined = input<boolean>(false);
    selectionPrecise = input<boolean>(false);

    // ================== Grid Inputs ==================
    gridHidden = input<boolean>(false);
    gridAction = input<'select' | 'move' | 'resize'>('select');
    gridPlain = input<boolean>(false);
    gridRows = input<number>(3);
    gridColumns = input<number>(3);
    gridBordered = input<boolean>(true);
    gridCovered = input<boolean>(true);
    gridThemeColor = input<string>('rgba(238, 238, 238, 0.5)');

    // ================== Crosshair Inputs ==================
    crosshairHidden = input<boolean>(false);
    crosshairCentered = input<boolean>(true);
    crosshairThemeColor = input<string>('rgba(238, 238, 238, 0.5)');

    // ================== Handle Inputs ==================
    handlesHidden = input<boolean>(false);
    handleThemeColor = input<string>('rgba(51, 153, 255, 0.5)');
    handleAction = input<'select' | 'move' | 'none'>('select');
    handlePlain = input<boolean>(true);

    constructor() {
        provideCropperJS().catch((err) => console.error('Cropper init failed', err));

        // Effects to update elements when inputs change
        effect(() => this.updateCanvasProperties());
        effect(() => this.updateImageProperties());
        effect(() => this.updateShadeProperties());
        effect(() => this.updateSelectionProperties());
        effect(() => this.updateGridProperties());
        effect(() => this.updateCrosshairProperties());
        effect(() => this.updateHandleProperties());
    }

    ngAfterViewInit() {
        // Apply all properties after view initialization
        setTimeout(() => {
            this.updateAllProperties();
        });
    }

    private updateCanvasProperties() {
        const canvas = this.cropperCanvasRef()?.nativeElement;
        if (!canvas) return;

        canvas.hidden = this.canvasHidden();
        canvas.background = this.canvasBackground();
        canvas.disabled = this.canvasDisabled();
        canvas.scaleStep = this.canvasScaleStep();
        canvas.themeColor = this.canvasThemeColor();
    }

    private updateImageProperties() {
        const image = this.cropperImageRef()?.nativeElement;
        if (!image) return;

        image.hidden = this.imageHidden();
        image.rotatable = this.imageRotatable();
        image.scalable = this.imageScalable();
        image.skewable = this.imageSkewable();
        image.translatable = this.imageTranslatable();
        image.initialCenterSize = this.imageInitialCenterSize();
        if (image.$image) image.$image.src = this.imageSrc();
        if (image.$image) image.$image.alt = this.imageAlt();
    }

    private updateShadeProperties() {
        const shade = this.cropperShadeRef()?.nativeElement;
        if (!shade) return;

        shade.hidden = this.shadeHidden();
        shade.themeColor = this.shadeThemeColor();
    }

    private updateSelectionProperties() {
        const selection = this.cropperSelectionRef()?.nativeElement;
        if (!selection) return;

        selection.hidden = this.selectionHidden();

        // Only set position/size if explicitly provided
        if (this.selectionX() !== undefined) selection.x = this.selectionX()!;
        if (this.selectionY() !== undefined) selection.y = this.selectionY()!;
        if (this.selectionWidth() !== undefined) selection.width = this.selectionWidth()!;
        if (this.selectionHeight() !== undefined) selection.height = this.selectionHeight()!;

        selection.aspectRatio = this.selectionAspectRatio();
        selection.initialAspectRatio = this.selectionInitialAspectRatio();
        selection.initialCoverage = this.selectionInitialCoverage();
        selection.dynamic = this.selectionDynamic();
        selection.movable = this.selectionMovable();
        selection.resizable = this.selectionResizable();
        selection.zoomable = this.selectionZoomable();
        selection.multiple = this.selectionMultiple();
        selection.keyboard = this.selectionKeyboard();
        selection.outlined = this.selectionOutlined();
        selection.precise = this.selectionPrecise();
    }

    private updateGridProperties() {
        const grid = this.cropperGridRef()?.nativeElement;
        if (!grid) return;

        grid.hidden = this.gridHidden();
        // grid.actionaction = this.gridAction();
        // grid.plain = this.gridPlain();
        grid.rows = this.gridRows();
        grid.columns = this.gridColumns();
        grid.bordered = this.gridBordered();
        grid.covered = this.gridCovered();
        grid.themeColor = this.gridThemeColor();
    }

    private updateCrosshairProperties() {
        const crosshair = this.cropperCrosshairRef()?.nativeElement;
        if (!crosshair) return;

        crosshair.hidden = this.crosshairHidden();
        crosshair.centered = this.crosshairCentered();
        crosshair.themeColor = this.crosshairThemeColor();
    }

    private updateHandleProperties() {
        const handles = this.cropperHandleRefs();
        if (!handles?.length) return;

        handles.forEach((handleRef) => {
            const handle = handleRef.nativeElement;
            handle.hidden = this.handlesHidden();
            handle.themeColor = this.handleThemeColor();
            handle.action = this.handleAction();
            handle.plain = this.handlePlain();
        });
    }

    private updateAllProperties() {
        this.updateImageProperties();
        this.updateCanvasProperties();
        this.updateShadeProperties();
        this.updateSelectionProperties();
        this.updateGridProperties();
        this.updateCrosshairProperties();
        this.updateHandleProperties();
    }

    // ================== Public API Methods ==================
    public toCanvas(): Promise<HTMLCanvasElement> {
        return this.cropperCanvasRef().nativeElement.$toCanvas();
    }

    public getImageTransform() {
        return this.cropperImageRef().nativeElement.$getTransform();
    }

    public setImageTransform(matrix: number[]) {
        return this.cropperImageRef().nativeElement.$setTransform(matrix);
    }

    public resetImageTransform() {
        return this.cropperImageRef().nativeElement.$resetTransform();
    }

    public centerImage(mode?: 'contain' | 'cover') {
        return this.cropperImageRef().nativeElement.$center(mode);
    }

    public moveImageTo(x: number, y: number) {
        return this.cropperImageRef().nativeElement.$moveTo(x, y);
    }

    public moveImage(deltaX: number, deltaY: number) {
        return this.cropperImageRef().nativeElement.$move(deltaX, deltaY);
    }

    public zoomImage(ratio: number, x?: number, y?: number) {
        return this.cropperImageRef().nativeElement.$zoom(ratio, x, y);
    }

    public rotateImage(angle: string, x?: number, y?: number) {
        return this.cropperImageRef().nativeElement.$rotate(angle, x, y);
    }

    public scaleImage(scaleX: number, scaleY: number) {
        return this.cropperImageRef().nativeElement.$scale(scaleX, scaleY);
    }

    public skewImage(angle: string) {
        return this.cropperImageRef().nativeElement.$skew(angle);
    }

    // Selection methods
    public changeSelection(x: number, y: number, width: number, height: number) {
        return this.cropperSelectionRef().nativeElement.$change(x, y, width, height);
    }

    public centerSelection() {
        return this.cropperSelectionRef().nativeElement.$center();
    }

    public resetSelection() {
        return this.cropperSelectionRef().nativeElement.$reset();
    }

    public clearSelection() {
        return this.cropperSelectionRef().nativeElement.$clear();
    }

    public moveSelectionTo(x: number, y: number) {
        return this.cropperSelectionRef().nativeElement.$moveTo(x, y);
    }

    public moveSelection(deltaX: number, deltaY: number) {
        return this.cropperSelectionRef().nativeElement.$move(deltaX, deltaY);
    }

    public resizeSelection(direction: string, deltaX: number, deltaY: number) {
        return this.cropperSelectionRef().nativeElement.$resize(direction, deltaX, deltaY);
    }

    public zoomSelection(ratio: number) {
        return this.cropperSelectionRef().nativeElement.$zoom(ratio);
    }

    public selectionToCanvas(): Promise<HTMLCanvasElement> {
        return this.cropperSelectionRef().nativeElement.$toCanvas();
    }
}
