import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    effect,
    ElementRef,
    inject,
    input,
    InputSignalWithTransform,
    viewChild,
    viewChildren,
} from '@angular/core';
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
    imports: [],
    templateUrl: './NgCropper.html',
    styleUrl: './NgCropper.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgCropper implements AfterViewInit {
    private readonly elementRef = inject(ElementRef);
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

    // ================== Canvas Inputs ==================
    canvasConfig = input<Partial<CropperCanvas>>();
    canvasHidden = input<boolean>(false);
    canvasBackground = input<boolean>(true);
    canvasDisabled = input<boolean>(false);
    canvasScaleStep = input<number>(0.1);
    canvasThemeColor = input<string>('#3399ff');

    // ================== Image Inputs ==================
    imageConfig = input<Partial<CropperImage>>();
    imageHidden = input<boolean>(false);
    imageRotatable = input<boolean>(true);
    imageScalable = input<boolean>(true);
    imageSkewable = input<boolean>(true);
    imageTranslatable = input<boolean>(true);
    imageInitialCenterSize: InputSignalWithTransform<'contain' | 'cover' | 'none', unknown> = input('contain', {
        transform: (value) => (['contain', 'cover', 'none'].includes(String(value)) ? value : 'contain') as 'contain' | 'cover' | 'none',
    });
    imageSrc = input<string>('https://picsum.photos/800/600');
    imageAlt = input<string>('The image to crop');

    // ================== Shade Inputs ==================
    shadeConfig = input<Partial<CropperShade>>();
    shadeHidden = input<boolean>(true);
    shadeThemeColor = input<string>('rgba(0, 0, 0, 0.65)');

    // ================== Selection Inputs ==================
    selectionConfig = input<Partial<CropperSelection>>();
    selectionHidden = input<boolean>(false);
    selectionX = input<number>(NaN);
    selectionY = input<number>(NaN);
    selectionWidth = input<number>(NaN);
    selectionHeight = input<number>(NaN);
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
    gridConfig = input<Partial<CropperGrid>>();
    gridHidden = input<boolean>(false);
    gridRows = input<number>(3);
    gridColumns = input<number>(3);
    gridBordered = input<boolean>(true);
    gridCovered = input<boolean>(true);
    gridThemeColor = input<string>('rgba(238, 238, 238, 0.5)');

    // ================== Crosshair Inputs ==================
    crosshairConfig = input<Partial<CropperCrosshair>>();
    crosshairHidden = input<boolean>(false);
    crosshairCentered = input<boolean>(true);
    crosshairThemeColor = input<string>('rgba(238, 238, 238, 0.5)');

    // ================== Handle Inputs ==================
    handlesHidden = input<boolean>(false);
    handlesThemeColor = input<string>('rgba(51, 153, 255, 0.5)');
    mainHandleAction = input('select', {
        transform: (value) => (['none', 'select', 'move'].includes(String(value)) ? value : 'select') as 'select' | 'move' | 'none',
    });
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

        image.hidden = this.imageHidden();
        image.rotatable = this.imageRotatable();
        image.scalable = this.imageScalable();
        image.skewable = this.imageSkewable();
        image.translatable = this.imageTranslatable();
        image.initialCenterSize = this.imageInitialCenterSize();
        if (image.$image) image.$image.src = this.imageSrc();
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

    public selectionToCanvas(): Promise<HTMLCanvasElement> {
        return this.cropperSelectionRef().nativeElement.$toCanvas();
    }
}
