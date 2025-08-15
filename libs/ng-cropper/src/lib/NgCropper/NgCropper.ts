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
import { mergeConfigurations } from '../utils/merge-configurations.util';

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
    toolbarConfig = input<Partial<NgCropperConfig['toolbar']>>(NgCropperInitialState.toolbar);
    showToolbar = input<NgCropperConfig['toolbar']['show']>(NgCropperInitialState.toolbar.show);
    toolbarPosition = input<NgCropperConfig['toolbar']['position']>(NgCropperInitialState.toolbar.position);
    protected readonly toolbar$ = computed(() => {
        const config = this.toolbarConfig() || {};
        const show = typeof this.showToolbar() === 'boolean' ? this.showToolbar() : NgCropperInitialState.toolbar.show;
        const position = this.toolbarPosition() || NgCropperInitialState.toolbar.position;

        return mergeConfigurations(NgCropperInitialState.toolbar, config, { show, position });
    });

    // ================== Canvas Inputs ==================
    canvasConfig = input<Partial<CropperCanvas>>(NgCropperInitialState.canvas);
    canvasHidden = input<NgCropperConfig['canvas']['hidden']>(NgCropperInitialState.canvas.hidden);
    canvasBackground = input<NgCropperConfig['canvas']['background']>(NgCropperInitialState.canvas.background);
    canvasDisabled = input<NgCropperConfig['canvas']['disabled']>(NgCropperInitialState.canvas.disabled);
    canvasScaleStep = input<NgCropperConfig['canvas']['scaleStep']>(NgCropperInitialState.canvas.scaleStep);
    canvasThemeColor = input<NgCropperConfig['canvas']['themeColor']>(NgCropperInitialState.canvas.themeColor);
    protected readonly canvas$ = computed(() => {
        const config = this.canvasConfig() || {};
        const hidden = this.canvasHidden();
        const background = this.canvasBackground();
        const disabled = this.canvasDisabled();
        const scaleStep = this.canvasScaleStep();
        const themeColor = this.canvasThemeColor();

        return mergeConfigurations(NgCropperInitialState.canvas, config, { hidden, background, disabled, scaleStep, themeColor });
    });

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
    protected readonly imageConfig$ = computed(() => {
        const config = this.imageConfig() || {};
        const hidden = this.imageHidden();
        const rotatable = this.imageRotatable();
        const scalable = this.imageScalable();
        const skewable = this.imageSkewable();
        const translatable = this.imageTranslatable();
        const initialCenterSize = this.imageInitialCenterSize();
        const src = this.imageSrc();
        const alt = this.imageAlt();

        return mergeConfigurations(NgCropperInitialState.image, config, { hidden, rotatable, scalable, skewable, translatable, initialCenterSize, src, alt });
    });

    // ================== Shade Inputs ==================
    shadeConfig = input<Partial<CropperShade>>(NgCropperInitialState.shade);
    shadeHidden = input<NgCropperConfig['shade']['hidden']>(NgCropperInitialState.shade.hidden);
    shadeThemeColor = input<NgCropperConfig['shade']['themeColor']>(NgCropperInitialState.shade.themeColor);
    protected readonly shade$ = computed(() => {
        const config = this.shadeConfig() || {};
        const hidden = this.shadeHidden();
        const themeColor = this.shadeThemeColor();

        return mergeConfigurations(NgCropperInitialState.shade, config, { hidden, themeColor });
    });

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
    protected readonly selection$ = computed(() => {
        const config = this.selectionConfig() || {};
        const hidden = this.selectionHidden();
        const x = this.selectionX();
        const y = this.selectionY();
        const width = this.selectionWidth();
        const height = this.selectionHeight();
        const aspectRatio = this.selectionAspectRatio();
        const initialAspectRatio = this.selectionInitialAspectRatio();
        const initialCoverage = this.selectionInitialCoverage();
        const dynamic = this.selectionDynamic();
        const movable = this.selectionMovable();
        const resizable = this.selectionResizable();
        const zoomable = this.selectionZoomable();
        const multiple = this.selectionMultiple();
        const keyboard = this.selectionKeyboard();
        const outlined = this.selectionOutlined();
        const precise = this.selectionPrecise();

        return mergeConfigurations(NgCropperInitialState.selection, config, {
            hidden,
            x,
            y,
            width,
            height,
            aspectRatio,
            initialAspectRatio,
            initialCoverage,
            dynamic,
            movable,
            resizable,
            zoomable,
            multiple,
            keyboard,
            outlined,
            precise,
        });
    });

    // ================== Grid Inputs ==================
    gridConfig = input<Partial<CropperGrid>>(NgCropperInitialState.grid);
    gridHidden = input<NgCropperConfig['grid']['hidden']>(NgCropperInitialState.grid.hidden);
    gridRows = input<NgCropperConfig['grid']['rows']>(NgCropperInitialState.grid.rows);
    gridColumns = input<NgCropperConfig['grid']['columns']>(NgCropperInitialState.grid.columns);
    gridBordered = input<NgCropperConfig['grid']['bordered']>(NgCropperInitialState.grid.bordered);
    gridCovered = input<NgCropperConfig['grid']['covered']>(NgCropperInitialState.grid.covered);
    gridThemeColor = input<NgCropperConfig['grid']['themeColor']>(NgCropperInitialState.grid.themeColor);
    protected readonly grid$ = computed(() => {
        const config = this.gridConfig() || {};
        const hidden = this.gridHidden();
        const rows = this.gridRows();
        const columns = this.gridColumns();
        const bordered = this.gridBordered();
        const covered = this.gridCovered();
        const themeColor = this.gridThemeColor();

        return mergeConfigurations(NgCropperInitialState.grid, config, { hidden, rows, columns, bordered, covered, themeColor });
    });

    // ================== Crosshair Inputs ==================
    crosshairConfig = input<Partial<CropperCrosshair>>(NgCropperInitialState.crosshair);
    crosshairHidden = input<NgCropperConfig['crosshair']['hidden']>(NgCropperInitialState.crosshair.hidden);
    crosshairCentered = input<NgCropperConfig['crosshair']['centered']>(NgCropperInitialState.crosshair.centered);
    crosshairThemeColor = input<NgCropperConfig['crosshair']['themeColor']>(NgCropperInitialState.crosshair.themeColor);
    protected readonly crosshair$ = computed(() => {
        const config = this.crosshairConfig() || {};
        const hidden = this.crosshairHidden();
        const centered = this.crosshairCentered();
        const themeColor = this.crosshairThemeColor();

        return mergeConfigurations(NgCropperInitialState.crosshair, config, { hidden, centered, themeColor });
    });

    // ================== Handle Inputs ==================
    handlesHidden = input<NgCropperConfig['handles']['hidden']>(NgCropperInitialState.handles.hidden);
    handlesThemeColor = input<NgCropperConfig['handles']['themeColor']>(NgCropperInitialState.handles.themeColor);
    handlesPlain = input<boolean>(true);
    protected readonly handles$ = computed(() => {
        const hidden = this.handlesHidden();
        const themeColor = this.handlesThemeColor();

        return mergeConfigurations(NgCropperInitialState.handles, {}, { hidden, themeColor });
    });

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

        const config = this.canvas$();
        Object.assign(canvas, config);
    }

    private updateImageProperties() {
        const image = this.cropperImageRef()?.nativeElement;
        if (!image) return;

        const imageElement = image.$image;
        if (imageElement) {
            imageElement.setAttribute('crossorigin', 'anonymous');
        }

        const config = this.imageConfig$();
        Object.assign(image, config);

        // Handle special image element properties
        if (image.$image) {
            image.$image.src = config.src;
            image.$image.alt = config.alt;
        }
    }

    private updateShadeProperties() {
        const shade = this.cropperShadeRef()?.nativeElement;
        if (!shade) return;

        const config = this.shade$();
        Object.assign(shade, config);
    }

    private updateSelectionProperties() {
        const selection = this.cropperSelectionRef()?.nativeElement;
        if (!selection) return;

        const config = this.selection$();

        // Only set position/size if explicitly provided (not NaN)
        if (!isNaN(config.x)) selection.x = config.x;
        if (!isNaN(config.y)) selection.y = config.y;
        if (config.width !== undefined) selection.width = config.width;
        if (config.height !== undefined) selection.height = config.height;

        // Apply all other properties
        Object.assign(selection, {
            ...config,
            // Override position/size handling to avoid NaN values
            x: selection.x,
            y: selection.y,
            width: selection.width,
            height: selection.height,
        });
    }

    private updateGridProperties() {
        const grid = this.cropperGridRef()?.nativeElement;
        if (!grid) return;

        const config = this.grid$();
        Object.assign(grid, config);
    }

    private updateCrosshairProperties() {
        const crosshair = this.cropperCrosshairRef()?.nativeElement;
        if (!crosshair) return;

        const config = this.crosshair$();
        Object.assign(crosshair, config);
    }

    private updateHandleProperties() {
        const handles = this.cropperHandleRefs();
        if (!handles?.length) return;

        const config = this.handles$();

        handles.forEach((handleRef, index) => {
            const handle = handleRef.nativeElement;
            Object.assign(handle, config);
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
