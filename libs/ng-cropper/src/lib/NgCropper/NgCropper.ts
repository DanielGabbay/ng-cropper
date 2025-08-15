import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, inject, input, viewChild, viewChildren } from '@angular/core';
import { Toolbar } from '../components/Toolbar/Toolbar';
import { NgCropperConfig, NgCropperInitialState } from '../ng-cropper.config';
import {
    CropperCanvas,
    CropperCanvasElement,
    CropperCrosshair,
    CropperCrosshairElement,
    CropperGrid,
    CropperGridElement,
    CropperHandleElement,
    CropperImage,
    CropperImageElement,
    CropperSelection,
    CropperSelectionElement,
    CropperShade,
    CropperShadeElement,
    provideCropperJS,
} from '../providers/cropperjs.provider';

@Component({
    selector: 'ngCropper',
    standalone: true,
    imports: [Toolbar],
    templateUrl: './NgCropper.html',
    styleUrl: './NgCropper.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [HttpClient],
})
export class NgCropper implements AfterViewInit {
    private readonly elementRef = inject(ElementRef);
    // Expose component instance to template (to pass as toolbar input)
    public readonly cropperSelf: NgCropper = this;
    // ================== Element References ==================
    public readonly cropperCanvasRef = viewChild.required<ElementRef<CropperCanvasElement>>('cropperCanvas', { debugName: 'cropperCanvasRef' });
    public readonly cropperImageRef = viewChild.required<ElementRef<CropperImageElement>>('cropperImage', { debugName: 'cropperImageRef' });
    public readonly cropperShadeRef = viewChild.required<ElementRef<CropperShadeElement>>('cropperShade', { debugName: 'cropperShadeRef' });
    public readonly cropperHandleRefs = viewChildren<ElementRef<CropperHandleElement>>('cropperHandle', { debugName: 'cropperHandleRefs' });
    public readonly cropperSelectionRef = viewChild.required<ElementRef<CropperSelectionElement>>('cropperSelection', { debugName: 'cropperSelectionRef' });
    public readonly cropperGridRef = viewChild.required<ElementRef<CropperGridElement>>('cropperGrid', { debugName: 'cropperGridRef' });
    public readonly cropperCrosshairRef = viewChild.required<ElementRef<CropperCrosshairElement>>('cropperCrosshair', { debugName: 'cropperCrosshairRef' });

    // ================== Style Customization ==================
    ngCropperStyleClass = input('ng-cropper-style', { transform: (classesString: string) => 'ng-cropper-style ' + classesString });
    cropperContainerClass = input('cropper-container', { transform: (classesString: string) => 'cropper-container ' + classesString });
    cropperCanvasClass = input('cropper-canvas', { transform: (classesString: string) => 'cropper-canvas ' + classesString });
    cropperImageClass = input('cropper-image', { transform: (classesString: string) => 'cropper-image ' + classesString });
    cropperShadeClass = input('cropper-shade', { transform: (classesString: string) => 'cropper-shade ' + classesString });
    cropperHandleClass = input('cropper-handle', { transform: (classesString: string) => 'cropper-handle ' + classesString });
    cropperSelectionClass = input('cropper-selection', { transform: (classesString: string) => 'cropper-selection ' + classesString });
    cropperGridClass = input('cropper-grid', { transform: (classesString: string) => 'cropper-grid ' + classesString });
    cropperCrosshairClass = input('cropper-crosshair', { transform: (classesString: string) => 'cropper-crosshair ' + classesString });

    // ================== Toolbar Inputs ==================
    showToolbar = input<NgCropperConfig['toolbar']['show']>(NgCropperInitialState.toolbar.show);
    toolbarPosition = input<NgCropperConfig['toolbar']['position']>(NgCropperInitialState.toolbar.position);

    // ================== Canvas Inputs ==================
    canvasConfig = input<Partial<CropperCanvas>>(NgCropperInitialState.canvas);
    canvasHidden = input<NgCropperConfig['canvas']['hidden']>(NgCropperInitialState.canvas.hidden);
    canvasBackground = input<NgCropperConfig['canvas']['background']>(NgCropperInitialState.canvas.background);
    canvasDisabled = input<NgCropperConfig['canvas']['disabled']>(NgCropperInitialState.canvas.disabled);
    canvasScaleStep = input<NgCropperConfig['canvas']['scaleStep']>(NgCropperInitialState.canvas.scaleStep);
    canvasThemeColor = input<NgCropperConfig['canvas']['themeColor']>(NgCropperInitialState.canvas.themeColor);

    // ================== Image Inputs ==================
    imageConfig = input<Partial<CropperImage>>(NgCropperInitialState.image);
    imageHidden = input<NgCropperConfig['image']['hidden']>(NgCropperInitialState.image.hidden);
    imageRotatable = input<NgCropperConfig['image']['rotatable']>(NgCropperInitialState.image.rotatable);
    imageScalable = input<NgCropperConfig['image']['scalable']>(NgCropperInitialState.image.scalable);
    imageSkewable = input<NgCropperConfig['image']['skewable']>(NgCropperInitialState.image.skewable);
    imageTranslatable = input<NgCropperConfig['image']['translatable']>(NgCropperInitialState.image.translatable);
    imageInitialCenterSize = input<NgCropperConfig['image']['initialCenterSize']>(NgCropperInitialState.image.initialCenterSize);
    imageSrc = input<NgCropperConfig['image']['src']>(NgCropperInitialState.image.src);
    image$ = computed<NgCropperConfig['image']['src']>(() => this.imageSrc());
    imageAlt = input<NgCropperConfig['image']['alt']>(NgCropperInitialState.image.alt);

    // ================== Shade Inputs ==================
    shadeConfig = input<Partial<CropperShade>>(NgCropperInitialState.shade);
    shadeHidden = input<NgCropperConfig['shade']['hidden']>(NgCropperInitialState.shade.hidden);
    shadeThemeColor = input<NgCropperConfig['shade']['themeColor']>(NgCropperInitialState.shade.themeColor);

    // ================== Selection Inputs ==================
    selectionConfig = input<Partial<CropperSelection>>(NgCropperInitialState.selection);
    selectionHidden = input<NgCropperConfig['selection']['hidden']>(NgCropperInitialState.selection.hidden);
    selectionX = input<NgCropperConfig['selection']['x']>(NgCropperInitialState.selection.x);
    selectionY = input<NgCropperConfig['selection']['y']>(NgCropperInitialState.selection.y);
    selectionWidth = input<NgCropperConfig['selection']['width']>(NgCropperInitialState.selection.width);
    selectionHeight = input<NgCropperConfig['selection']['height']>(NgCropperInitialState.selection.height);
    selectionAspectRatio = input<NgCropperConfig['selection']['aspectRatio']>(NgCropperInitialState.selection.aspectRatio);
    selectionInitialAspectRatio = input<NgCropperConfig['selection']['initialAspectRatio']>(NgCropperInitialState.selection.initialAspectRatio);
    selectionInitialCoverage = input<NgCropperConfig['selection']['initialCoverage']>(NgCropperInitialState.selection.initialCoverage);
    selectionDynamic = input<NgCropperConfig['selection']['dynamic']>(NgCropperInitialState.selection.dynamic);
    selectionMovable = input<NgCropperConfig['selection']['movable']>(NgCropperInitialState.selection.movable);
    selectionResizable = input<NgCropperConfig['selection']['resizable']>(NgCropperInitialState.selection.resizable);
    selectionZoomable = input<NgCropperConfig['selection']['zoomable']>(NgCropperInitialState.selection.zoomable);
    selectionMultiple = input<NgCropperConfig['selection']['multiple']>(NgCropperInitialState.selection.multiple);
    selectionKeyboard = input<NgCropperConfig['selection']['keyboard']>(NgCropperInitialState.selection.keyboard);
    selectionOutlined = input<NgCropperConfig['selection']['outlined']>(NgCropperInitialState.selection.outlined);
    selectionPrecise = input<NgCropperConfig['selection']['precise']>(NgCropperInitialState.selection.precise);

    // ================== Grid Inputs ==================
    gridConfig = input<Partial<CropperGrid>>(NgCropperInitialState.grid);
    gridHidden = input<NgCropperConfig['grid']['hidden']>(NgCropperInitialState.grid.hidden);
    gridRows = input<NgCropperConfig['grid']['rows']>(NgCropperInitialState.grid.rows);
    gridColumns = input<NgCropperConfig['grid']['columns']>(NgCropperInitialState.grid.columns);
    gridBordered = input<NgCropperConfig['grid']['bordered']>(NgCropperInitialState.grid.bordered);
    gridCovered = input<NgCropperConfig['grid']['covered']>(NgCropperInitialState.grid.covered);
    gridThemeColor = input<NgCropperConfig['grid']['themeColor']>(NgCropperInitialState.grid.themeColor);

    // ================== Crosshair Inputs ==================
    crosshairConfig = input<Partial<CropperCrosshair>>(NgCropperInitialState.crosshair);
    crosshairHidden = input<NgCropperConfig['crosshair']['hidden']>(NgCropperInitialState.crosshair.hidden);
    crosshairCentered = input<NgCropperConfig['crosshair']['centered']>(NgCropperInitialState.crosshair.centered);
    crosshairThemeColor = input<NgCropperConfig['crosshair']['themeColor']>(NgCropperInitialState.crosshair.themeColor);

    // ================== Handle Inputs ==================
    handlesHidden = input<NgCropperConfig['handles']['hidden']>(NgCropperInitialState.handles.hidden);
    handlesThemeColor = input<NgCropperConfig['handles']['themeColor']>(NgCropperInitialState.handles.themeColor);
    handlesPlain = input<boolean>(true);

    constructor() {
        provideCropperJS().catch((err) => console.error('Cropper init failed', err));

        // Effects to update elements when inputs change
        effect(() => this.updateCustomStyles());
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

    private updateCustomStyles() {
        const ngCropperStyle = this.ngCropperStyleClass();
        if (ngCropperStyle) {
            this.elementRef.nativeElement.setAttribute('class', ngCropperStyle);
        }

        const image = this.cropperImageRef()?.nativeElement;
        if (image) {
            image.className = this.cropperImageClass();
        }

        const shade = this.cropperShadeRef()?.nativeElement;
        if (shade) {
            shade.className = this.cropperShadeClass();
        }

        const selection = this.cropperSelectionRef()?.nativeElement;
        if (selection) {
            selection.className = this.cropperSelectionClass();
        }

        const grid = this.cropperGridRef()?.nativeElement;
        if (grid) {
            grid.className = this.cropperGridClass();
        }

        const crosshair = this.cropperCrosshairRef()?.nativeElement;
        if (crosshair) {
            crosshair.className = this.cropperCrosshairClass();
        }

        const handles = this.cropperHandleRefs();
        handles.forEach((handleRef) => {
            handleRef.nativeElement.className = this.cropperHandleClass();
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

        const canvasConfig = this.canvasConfig();
        if (canvasConfig) {
            Object.assign(canvas, canvasConfig);
        }
    }

    private updateImageProperties() {
        const image = this.cropperImageRef()?.nativeElement;
        if (!image) return;

        const imageElement = image.$image;
        if (imageElement) {
            imageElement.setAttribute('crossorigin', 'anonymous');
        }

        image.hidden = this.imageHidden();
        image.rotatable = this.imageRotatable();
        image.scalable = this.imageScalable();
        image.skewable = this.imageSkewable();
        image.translatable = this.imageTranslatable();
        image.initialCenterSize = this.imageInitialCenterSize();
        if (image.$image) image.$image.src = this.image$();
        if (image.$image) image.$image.alt = this.imageAlt();

        if (this.imageConfig()) {
            Object.assign(image, this.imageConfig());
        }
    }

    private updateShadeProperties() {
        const shade = this.cropperShadeRef()?.nativeElement;
        if (!shade) return;

        shade.hidden = this.shadeHidden();
        shade.themeColor = this.shadeThemeColor();

        if (this.shadeConfig()) {
            Object.assign(shade, this.shadeConfig());
        }
    }

    private updateSelectionProperties() {
        const selection = this.cropperSelectionRef()?.nativeElement;
        if (!selection) return;

        selection.hidden = this.selectionHidden();

        // Only set position/size if explicitly provided
        if (this.selectionX() !== undefined) selection.x = this.selectionX();
        if (this.selectionY() !== undefined) selection.y = this.selectionY();
        if (this.selectionWidth() !== undefined) selection.width = this.selectionWidth();
        if (this.selectionHeight() !== undefined) selection.height = this.selectionHeight();

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

        if (this.selectionConfig()) {
            Object.assign(selection, this.selectionConfig());
        }
    }

    private updateGridProperties() {
        const grid = this.cropperGridRef()?.nativeElement;
        if (!grid) return;

        grid.hidden = this.gridHidden();
        grid.rows = this.gridRows();
        grid.columns = this.gridColumns();
        grid.bordered = this.gridBordered();
        grid.covered = this.gridCovered();
        grid.themeColor = this.gridThemeColor();

        if (this.gridConfig()) {
            Object.assign(grid, this.gridConfig());
        }
    }

    private updateCrosshairProperties() {
        const crosshair = this.cropperCrosshairRef()?.nativeElement;
        if (!crosshair) return;

        crosshair.hidden = this.crosshairHidden();
        crosshair.centered = this.crosshairCentered();
        crosshair.themeColor = this.crosshairThemeColor();

        if (this.crosshairConfig()) {
            Object.assign(crosshair, this.crosshairConfig());
        }
    }

    private updateHandleProperties() {
        const handles = this.cropperHandleRefs();
        if (!handles?.length) return;

        handles.forEach((handleRef, index) => {
            const handle = handleRef.nativeElement;
            handle.hidden = this.handlesHidden();
            handle.themeColor = this.handlesThemeColor();
            handle.plain = this.handlesPlain();

            // Set specific theme color for the move handle (first one)
            if (index === 0) {
                handle.themeColor = 'rgba(255, 255, 255, 0.35)';
            }
        });
    }

    private updateAllProperties() {
        this.updateCustomStyles();
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

    public selectionToCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement> {
        // The cropper selection accepts a compatible options object
        return this.cropperSelectionRef().nativeElement.$toCanvas(options ?? undefined);
    }

    /**
     * Export the current selection as a Base64 data URL.
     *
     * @param type The MIME type, e.g. 'image/png' (default) or 'image/jpeg'.
     * @param quality For image/jpeg or image/webp, a number between 0 and 1.
     * @param options Optional canvas generation options: width/height to control output resolution,
     *                backgroundColor to fill before drawing (useful for JPEG), and beforeDraw hook.
     */
    public async selectionToDataURL(
        type = 'image/png',
        quality?: number,
        options?: {
            width?: number;
            height?: number;
            backgroundColor?: string;
            beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
        }
    ): Promise<string> {
        const canvas = await this.selectionToCanvas({
            width: options?.width,
            height: options?.height,
            beforeDraw: (ctx, cvs) => {
                if (options?.backgroundColor) {
                    ctx.save();
                    ctx.fillStyle = options.backgroundColor;
                    ctx.fillRect(0, 0, cvs.width, cvs.height);
                    ctx.restore();
                }
                options?.beforeDraw?.(ctx, cvs);
            },
        });
        return canvas.toDataURL(type, quality);
    }

    /**
     * Export the current selection as a Blob.
     *
     * Prefer this for large images to avoid base64 overhead.
     */
    public async selectionToBlob(
        type = 'image/png',
        quality?: number,
        options?: {
            width?: number;
            height?: number;
            backgroundColor?: string;
            beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
        }
    ): Promise<Blob> {
        const canvas = await this.selectionToCanvas({
            width: options?.width,
            height: options?.height,
            beforeDraw: (ctx, cvs) => {
                if (options?.backgroundColor) {
                    ctx.save();
                    ctx.fillStyle = options.backgroundColor;
                    ctx.fillRect(0, 0, cvs.width, cvs.height);
                    ctx.restore();
                }
                options?.beforeDraw?.(ctx, cvs);
            },
        });
        return new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) return resolve(blob);
                    reject(new Error('Canvas toBlob returned null'));
                },
                type,
                quality
            );
        });
    }
}
