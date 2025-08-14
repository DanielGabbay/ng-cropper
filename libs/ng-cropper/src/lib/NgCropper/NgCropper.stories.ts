import type { Meta, StoryObj } from '@storybook/angular';
import { NgCropper } from './NgCropper';

const meta: Meta<NgCropper> = {
    component: NgCropper,
    title: 'NgCropper',
    argTypes: {
        // Style Customization
        ngCropperStyleClass: {
            control: 'text',
            description: 'Custom CSS classes for the ng-cropper',
            table: { category: 'Style' },
        },
        cropperContainerClass: {
            control: 'text',
            description: 'Custom CSS classes for the cropper container',
            table: { category: 'Style' },
        },
        cropperCanvasClass: {
            control: 'text',
            description: 'Custom CSS classes for the cropper canvas',
            table: { category: 'Style' },
        },
        cropperImageClass: {
            control: 'text',
            description: 'Custom CSS classes for the cropper image',
            table: { category: 'Style' },
        },
        cropperShadeClass: {
            control: 'text',
            description: 'Custom CSS classes for the cropper shade',
            table: { category: 'Style' },
        },
        cropperHandleClass: {
            control: 'text',
            description: 'Custom CSS classes for the cropper handles',
            table: { category: 'Style' },
        },
        cropperSelectionClass: {
            control: 'text',
            description: 'Custom CSS classes for the cropper selection area',
            table: { category: 'Style' },
        },
        cropperGridClass: {
            control: 'text',
            description: 'Custom CSS classes for the cropper grid',
            table: { category: 'Style' },
        },
        cropperCrosshairClass: {
            control: 'text',
            description: 'Custom CSS classes for the cropper crosshair',
            table: { category: 'Style' },
        },

        // Canvas Properties
        canvasHidden: {
            control: 'boolean',
            description: 'Hide/show the canvas element',
            table: { category: 'Canvas' },
        },
        canvasBackground: {
            control: 'boolean',
            description: 'Show canvas background',
            table: { category: 'Canvas' },
        },
        canvasDisabled: {
            control: 'boolean',
            description: 'Disable canvas interactions',
            table: { category: 'Canvas' },
        },
        canvasScaleStep: {
            control: { type: 'number', min: 0.1, max: 1, step: 0.1 },
            description: 'Scale step for canvas zoom',
            table: { category: 'Canvas' },
        },
        canvasThemeColor: {
            control: 'color',
            description: 'Canvas theme color',
            table: { category: 'Canvas' },
        },

        // Image Properties
        imageHidden: {
            control: 'boolean',
            description: 'Hide/show the image',
            table: { category: 'Image' },
        },
        imageRotatable: {
            control: 'boolean',
            description: 'Allow image rotation',
            table: { category: 'Image' },
        },
        imageScalable: {
            control: 'boolean',
            description: 'Allow image scaling',
            table: { category: 'Image' },
        },
        imageSkewable: {
            control: 'boolean',
            description: 'Allow image skewing',
            table: { category: 'Image' },
        },
        imageTranslatable: {
            control: 'boolean',
            description: 'Allow image translation',
            table: { category: 'Image' },
        },
        imageInitialCenterSize: {
            control: { type: 'select' },
            options: ['contain', 'cover', 'none'],
            description: 'Initial image sizing',
            table: { category: 'Image' },
        },
        imageSrc: {
            control: 'text',
            description: 'Image source URL',
            table: { category: 'Image' },
        },
        imageAlt: {
            control: 'text',
            description: 'Image alt text',
            table: { category: 'Image' },
        },

        // Selection Properties
        selectionHidden: {
            control: 'boolean',
            description: 'Hide/show selection area',
            table: { category: 'Selection' },
        },
        selectionX: {
            control: { type: 'number' },
            description: 'Selection X position',
            table: { category: 'Selection' },
        },
        selectionY: {
            control: { type: 'number' },
            description: 'Selection Y position',
            table: { category: 'Selection' },
        },
        selectionWidth: {
            control: { type: 'number', min: 0 },
            description: 'Selection width',
            table: { category: 'Selection' },
        },
        selectionHeight: {
            control: { type: 'number', min: 0 },
            description: 'Selection height',
            table: { category: 'Selection' },
        },
        selectionAspectRatio: {
            control: { type: 'select' },
            options: ['Free', '16:9', '4:3', '1:1', '3:4', '9:16'],
            mapping: {
                Free: NaN,
                '16:9': 16 / 9,
                '4:3': 4 / 3,
                '1:1': 1,
                '3:4': 3 / 4,
                '9:16': 9 / 16,
            },
            description: 'Selection aspect ratio constraint',
            table: { category: 'Selection' },
        },
        selectionInitialAspectRatio: {
            control: { type: 'select' },
            options: ['Free', '16:9', '4:3', '1:1', '3:4', '9:16'],
            mapping: {
                Free: NaN,
                '16:9': 16 / 9,
                '4:3': 4 / 3,
                '1:1': 1,
                '3:4': 3 / 4,
                '9:16': 9 / 16,
            },
            description: 'Initial aspect ratio',
            table: { category: 'Selection' },
        },
        selectionInitialCoverage: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Initial coverage percentage (0-1)',
            table: { category: 'Selection' },
        },
        selectionDynamic: {
            control: 'boolean',
            description: 'Dynamic selection updates',
            table: { category: 'Selection' },
        },
        selectionMovable: {
            control: 'boolean',
            description: 'Allow selection movement',
            table: { category: 'Selection' },
        },
        selectionResizable: {
            control: 'boolean',
            description: 'Allow selection resizing',
            table: { category: 'Selection' },
        },
        selectionZoomable: {
            control: 'boolean',
            description: 'Allow selection zooming',
            table: { category: 'Selection' },
        },
        selectionMultiple: {
            control: 'boolean',
            description: 'Allow multiple selections',
            table: { category: 'Selection' },
        },
        selectionKeyboard: {
            control: 'boolean',
            description: 'Enable keyboard controls',
            table: { category: 'Selection' },
        },
        selectionOutlined: {
            control: 'boolean',
            description: 'Show selection outline',
            table: { category: 'Selection' },
        },
        selectionPrecise: {
            control: 'boolean',
            description: 'Precise selection mode',
            table: { category: 'Selection' },
        },

        // Grid Properties
        gridHidden: {
            control: 'boolean',
            description: 'Hide/show grid',
            table: { category: 'Grid' },
        },
        gridRows: {
            control: { type: 'number', min: 0, max: 9, step: 1 },
            description: 'Number of grid rows',
            table: { category: 'Grid' },
        },
        gridColumns: {
            control: { type: 'number', min: 0, max: 9, step: 1 },
            description: 'Number of grid columns',
            table: { category: 'Grid' },
        },
        gridBordered: {
            control: 'boolean',
            description: 'Show grid borders',
            table: { category: 'Grid' },
        },
        gridCovered: {
            control: 'boolean',
            description: 'Grid covers entire selection',
            table: { category: 'Grid' },
        },
        gridThemeColor: {
            control: 'color',
            description: 'Grid theme color',
            table: { category: 'Grid' },
        },

        // Crosshair Properties
        crosshairHidden: {
            control: 'boolean',
            description: 'Hide/show crosshair',
            table: { category: 'Crosshair' },
        },
        crosshairCentered: {
            control: 'boolean',
            description: 'Center the crosshair',
            table: { category: 'Crosshair' },
        },
        crosshairThemeColor: {
            control: 'color',
            description: 'Crosshair theme color',
            table: { category: 'Crosshair' },
        },

        // Handle Properties
        handlesHidden: {
            control: 'boolean',
            description: 'Hide/show resize handles',
            table: { category: 'Handles' },
        },
        handlesThemeColor: {
            control: 'color',
            description: 'Handles theme color',
            table: { category: 'Handles' },
        },
    },
    args: {
        // Canvas defaults
        canvasHidden: false,
        canvasBackground: true,
        canvasDisabled: false,
        canvasScaleStep: 0.1,
        canvasThemeColor: '#3399ff',

        // Image defaults
        imageHidden: false,
        imageRotatable: true,
        imageScalable: true,
        imageSkewable: true,
        imageTranslatable: true,
        imageInitialCenterSize: 'contain',
        imageSrc: 'https://picsum.photos/800/600',
        imageAlt: 'The image to crop',

        // Selection defaults
        selectionHidden: false,
        selectionX: undefined,
        selectionY: undefined,
        selectionWidth: undefined,
        selectionHeight: undefined,
        selectionAspectRatio: NaN,
        selectionInitialAspectRatio: NaN,
        selectionInitialCoverage: 0.5,
        selectionDynamic: false,
        selectionMovable: true,
        selectionResizable: true,
        selectionZoomable: false,
        selectionMultiple: false,
        selectionKeyboard: false,
        selectionOutlined: false,
        selectionPrecise: true,

        // Grid defaults
        gridHidden: false,
        gridRows: 3,
        gridColumns: 3,
        gridBordered: true,
        gridCovered: true,
        gridThemeColor: 'rgba(238, 238, 238, 0.5)',

        // Crosshair defaults
        crosshairHidden: false,
        crosshairCentered: true,
        crosshairThemeColor: 'rgba(238, 238, 238, 0.5)',

        // Handles defaults
        handlesHidden: false,
        handlesThemeColor: 'rgba(51, 153, 255, 0.5)',
    },
    parameters: {
        docs: {
            description: {
                component: 'NgCropper is a powerful Angular image cropper component with full customization capabilities.',
            },
        },
    },
};

export default meta;

type Story = StoryObj<NgCropper>;

export const Interactive: Story = {
    args: {
        ngCropperStyleClass: ""
    },
    render: (args) => ({
        props: args,
        template: `
                <ngCropper 
                    [ngCropperStyleClass]="ngCropperStyleClass"
                    [cropperContainerClass]="cropperContainerClass"
                    [cropperCanvasClass]="cropperCanvasClass"
                    [cropperImageClass]="cropperImageClass"
                    [cropperShadeClass]="cropperShadeClass"
                    [cropperHandleClass]="cropperHandleClass"
                    [cropperSelectionClass]="cropperSelectionClass"
                    [cropperGridClass]="cropperGridClass"
                    [cropperCrosshairClass]="cropperCrosshairClass"
                    [canvasHidden]="canvasHidden"
                    [canvasBackground]="canvasBackground"
                    [canvasDisabled]="canvasDisabled"
                    [canvasScaleStep]="canvasScaleStep"
                    [canvasThemeColor]="canvasThemeColor"
                    [imageHidden]="imageHidden"
                    [imageRotatable]="imageRotatable"
                    [imageScalable]="imageScalable"
                    [imageSkewable]="imageSkewable"
                    [imageTranslatable]="imageTranslatable"
                    [imageInitialCenterSize]="imageInitialCenterSize"
                    [imageSrc]="imageSrc"
                    [imageAlt]="imageAlt"
                    [selectionHidden]="selectionHidden"
                    [selectionX]="selectionX"
                    [selectionY]="selectionY"
                    [selectionWidth]="selectionWidth"
                    [selectionHeight]="selectionHeight"
                    [selectionAspectRatio]="selectionAspectRatio"
                    [selectionInitialAspectRatio]="selectionInitialAspectRatio"
                    [selectionInitialCoverage]="selectionInitialCoverage"
                    [selectionDynamic]="selectionDynamic"
                    [selectionMovable]="selectionMovable"
                    [selectionResizable]="selectionResizable"
                    [selectionZoomable]="selectionZoomable"
                    [selectionMultiple]="selectionMultiple"
                    [selectionKeyboard]="selectionKeyboard"
                    [selectionOutlined]="selectionOutlined"
                    [selectionPrecise]="selectionPrecise"
                    [gridHidden]="gridHidden"
                    [gridRows]="gridRows"
                    [gridColumns]="gridColumns"
                    [gridBordered]="gridBordered"
                    [gridCovered]="gridCovered"
                    [gridThemeColor]="gridThemeColor"
                    [crosshairHidden]="crosshairHidden"
                    [crosshairCentered]="crosshairCentered"
                    [crosshairThemeColor]="crosshairThemeColor"
                    [handlesHidden]="handlesHidden"
                    [handleThemeColor]="handleThemeColor">
                </ngCropper>
        `,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo with all available controls. Use the controls panel to experiment with different settings.',
            },
        },
    },
};

export const BasicCropper: Story = {
    args: {
        imageSrc: 'https://picsum.photos/800/600',
        selectionInitialCoverage: 0.6,
    },
    parameters: {
        docs: {
            description: {
                story: 'Basic cropper setup with default settings and a sample image.',
            },
        },
    },
};

export const FixedAspectRatio: Story = {
    args: {
        imageSrc: 'https://picsum.photos/800/600',
        selectionAspectRatio: 16 / 9,
        selectionResizable: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Cropper with fixed 16:9 aspect ratio constraint.',
            },
        },
    },
};

export const SquareAspectRatio: Story = {
    args: {
        imageSrc: 'https://picsum.photos/800/600',
        selectionAspectRatio: 1,
        selectionInitialCoverage: 0.8,
    },
    parameters: {
        docs: {
            description: {
                story: 'Cropper with 1:1 (square) aspect ratio.',
            },
        },
    },
};

export const MinimalCropper: Story = {
    args: {
        imageSrc: 'https://picsum.photos/800/600',
        gridHidden: true,
        crosshairHidden: true,
        handlesHidden: true,
        selectionOutlined: true,
        canvasThemeColor: '#ff6b6b',
    },
    parameters: {
        docs: {
            description: {
                story: 'Minimal cropper interface with grid, crosshair, and handles hidden.',
            },
        },
    },
};
