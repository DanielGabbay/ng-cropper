import { CropperCanvas, CropperCrosshair, CropperGrid, CropperHandle, CropperImage, CropperSelection, CropperShade } from 'cropperjs';

/**
 * Configuration for the ng-cropper component.
 */
export type NgCropperConfig = {
    toolbar: {
        show: boolean;
        position: 'top' | 'bottom';
    };
    canvas: Pick<CropperCanvas, 'hidden' | 'background' | 'disabled' | 'scaleStep' | 'themeColor'>;
    image: Pick<CropperImage, 'hidden' | 'rotatable' | 'scalable' | 'skewable' | 'translatable' | 'initialCenterSize'> & Pick<CropperImage['$image'], 'src' | 'alt'>;
    shade: Pick<CropperShade, 'hidden' | 'themeColor'>;
    selection: Pick<
        CropperSelection,
        | 'hidden'
        | 'x'
        | 'y'
        | 'width'
        | 'height'
        | 'aspectRatio'
        | 'initialAspectRatio'
        | 'initialCoverage'
        | 'dynamic'
        | 'movable'
        | 'resizable'
        | 'zoomable'
        | 'multiple'
        | 'keyboard'
        | 'outlined'
        | 'precise'
    >;
    grid: Pick<CropperGrid, 'hidden' | 'rows' | 'columns' | 'bordered' | 'covered' | 'themeColor'>;
    crosshair: Pick<CropperCrosshair, 'hidden' | 'centered' | 'themeColor'>;
    handles: Pick<CropperHandle, 'hidden' | 'themeColor'>;

    /** For partial configuration of cropperjs components. to allow all available options that not listed in the main config */
    partials: {
        canvas?: Partial<CropperCanvas>;
        image?: Partial<CropperImage>;
        shade?: Partial<CropperShade>;
        selection?: Partial<CropperSelection>;
        grid?: Partial<CropperGrid>;
        crosshair?: Partial<CropperCrosshair>;
    };
};

/**
 * Initial state of the cropper configuration.
 * This is used to reset the cropper to its initial state.
 * It is also used as the default configuration when no configuration is provided.
 */
export const NgCropperInitialState = Object.freeze<NgCropperConfig>({
    toolbar: {
        show: true,
        position: 'bottom',
    },
    canvas: {
        hidden: false,
        background: true,
        disabled: false,
        scaleStep: 0.1,
        themeColor: '#3399ff',
    },
    image: {
        hidden: false,
        rotatable: true,
        scalable: true,
        skewable: true,
        translatable: true,
        initialCenterSize: 'contain',
        src: 'https://picsum.photos/800/600',
        alt: 'The image to crop',
    },
    shade: {
        hidden: false,
        themeColor: 'rgba(0, 0, 0, 0.65)',
    },
    selection: {
        hidden: false,
        x: NaN,
        y: NaN,
        width: 200,
        height: 200,
        aspectRatio: NaN,
        initialAspectRatio: NaN,
        initialCoverage: 0.5,
        dynamic: false,
        movable: true,
        resizable: true,
        zoomable: true,
        multiple: false,
        keyboard: false,
        outlined: true,
        precise: true,
    },
    grid: {
        hidden: false,
        rows: 3,
        columns: 3,
        bordered: true,
        covered: true,
        themeColor: 'rgba(238, 238, 238, 0.5)',
    },
    crosshair: {
        hidden: false,
        centered: true,
        themeColor: 'rgba(238, 238, 238, 0.5)',
    },
    handles: {
        hidden: false,
        themeColor: 'rgba(51, 153, 255, 0.5)',
    },
    partials: {
        canvas: {},
        image: {},
        shade: {},
        selection: {},
        grid: {},
        crosshair: {},
    },
});
