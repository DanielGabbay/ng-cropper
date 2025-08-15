import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import { NgCropper } from './NgCropper';

const meta: Meta<NgCropper> = {
    component: NgCropper,
    title: 'NgCropper',
    argTypes: {
        // Shade
        shadeHidden: {
            control: 'boolean',
            description: 'Hide/show the shade overlay',
            table: { category: 'Shade' },
        },
        shadeThemeColor: {
            control: 'color',
            description: 'Shade theme color',
            table: { category: 'Shade' },
        },
        // Toolbar
        showToolbar: {
            control: 'boolean',
            description: 'Show the built-in toolbar',
            table: { category: 'Toolbar' },
        },
        toolbarPosition: {
            control: { type: 'inline-radio' },
            options: ['top', 'bottom'],
            description: 'Toolbar position',
            table: { category: 'Toolbar' },
        },
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
        
        // Config object inputs (new approach)
        toolbarConfig: {
            control: 'object',
            description: 'Complete toolbar configuration object - use this instead of individual toolbar properties',
            table: { category: 'Config Objects' },
        },
        canvasConfig: {
            control: 'object',
            description: 'Complete canvas configuration object - use this instead of individual canvas properties',
            table: { category: 'Config Objects' },
        },
        imageConfig: {
            control: 'object',
            description: 'Complete image configuration object - use this instead of individual image properties',
            table: { category: 'Config Objects' },
        },
        shadeConfig: {
            control: 'object',
            description: 'Complete shade configuration object - use this instead of individual shade properties',
            table: { category: 'Config Objects' },
        },
        selectionConfig: {
            control: 'object',
            description: 'Complete selection configuration object - use this instead of individual selection properties',
            table: { category: 'Config Objects' },
        },
        gridConfig: {
            control: 'object',
            description: 'Complete grid configuration object - use this instead of individual grid properties',
            table: { category: 'Config Objects' },
        },
        crosshairConfig: {
            control: 'object',
            description: 'Complete crosshair configuration object - use this instead of individual crosshair properties',
            table: { category: 'Config Objects' },
        },
    },
    args: {
        // Toolbar defaults
        showToolbar: false,
        toolbarPosition: 'bottom',
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

        // Shade defaults
        shadeHidden: false,
        shadeThemeColor: 'rgba(0, 0, 0, 0.65)',

        // Selection defaults
        selectionHidden: false,
        selectionX: Number.NaN,
        selectionY: Number.NaN,
        selectionWidth: 200,
        selectionHeight: 200,
        selectionAspectRatio: NaN,
        selectionInitialAspectRatio: NaN,
        selectionInitialCoverage: 0.5,
        selectionDynamic: false,
        selectionMovable: true,
        selectionResizable: true,
        selectionZoomable: true,
        selectionMultiple: false,
        selectionKeyboard: false,
        selectionOutlined: true,
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
                component: 'NgCropper is a powerful Angular image cropper component with full customization capabilities. Use showToolbar and toolbarPosition to enable a built-in toolbar. You can use individual property inputs or comprehensive config objects for each component.',
            },
        },
                layout: 'fullscreen',
    },
        decorators: [
                        componentWrapperDecorator((story) => `
                            <div class="h-screen">
                                <div class="h-full">
                                    ${story}
                                </div>
                            </div>
                        `),
        ],
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
                    [showToolbar]="showToolbar"
                    [toolbarPosition]="toolbarPosition"
                    [ngCropperStyleClass]="ngCropperStyleClass"
                    [cropperContainerClass]="cropperContainerClass"
                    [cropperCanvasClass]="cropperCanvasClass"
                    [cropperImageClass]="cropperImageClass"
                    [cropperShadeClass]="cropperShadeClass"
                    [shadeHidden]="shadeHidden"
                    [shadeThemeColor]="shadeThemeColor"
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
                    [handlesThemeColor]="handlesThemeColor">
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

// Toolbar-focused stories
export const ToolbarBottom: Story = {
    args: {
        showToolbar: true,
        toolbarPosition: 'bottom',
        imageSrc: 'https://picsum.photos/800/600',
        selectionInitialCoverage: 0.6,
    },
    parameters: {
        docs: {
            description: { story: 'Built-in toolbar displayed at the bottom.' },
        },
    },
};

export const ToolbarTop: Story = {
    args: {
        showToolbar: false,
        toolbarPosition: 'top',
        imageSrc: 'https://picsum.photos/800/600',
        selectionInitialCoverage: 0.6,
    },
    parameters: {
        docs: {
            description: { story: 'Built-in toolbar displayed at the top.' },
        },
    },
};

export const ToolbarMinimal: Story = {
    args: {
        showToolbar: true,
        toolbarPosition: 'bottom',
        imageSrc: 'https://picsum.photos/800/600',
        gridHidden: true,
        crosshairHidden: true,
        handlesHidden: true,
        selectionOutlined: true,
    },
    parameters: {
        docs: {
            description: { story: 'Minimal UI with just the toolbar controls.' },
        },
    },
};

export const ToolbarFixedSquare: Story = {
    args: {
        showToolbar: true,
        toolbarPosition: 'bottom',
        imageSrc: 'https://picsum.photos/800/600',
        selectionAspectRatio: 1,
        selectionResizable: true,
    },
    parameters: {
        docs: {
            description: { story: 'Toolbar with a fixed 1:1 selection aspect ratio.' },
        },
    },
};

export const ToolbarCustomIcons: Story = {
    args: {
        showToolbar: true,
        toolbarPosition: 'bottom',
        imageSrc: 'https://picsum.photos/800/600',
        toolbarConfig: {
            icons: {
                rotateLeft: 'fas fa-undo',
                rotateRight: 'fas fa-redo',
                zoomIn: 'fas fa-search-plus',
                zoomOut: 'fas fa-search-minus',
                crop: 'fas fa-crop',
                reset: 'fas fa-sync-alt',
            }
        },
    },
    parameters: {
        docs: {
            description: { 
                story: 'Toolbar with custom FontAwesome icons using toolbarConfig. Note: FontAwesome must be included separately in your project for these icons to display.' 
            },
        },
    },
};

export const ToolbarMaterialIcons: Story = {
    args: {
        showToolbar: true,
        toolbarPosition: 'bottom',
        imageSrc: 'https://picsum.photos/800/600',
        toolbarConfig: {
            icons: {
                rotateLeft: 'material-icons rotate_left',
                rotateRight: 'material-icons rotate_right',
                zoomIn: 'material-icons zoom_in',
                zoomOut: 'material-icons zoom_out',
                crop: 'material-icons crop',
                reset: 'material-icons refresh',
            }
        },
    },
    parameters: {
        docs: {
            description: { 
                story: 'Toolbar with Material Icons using toolbarConfig. Note: Material Icons must be included separately in your project for these icons to display.' 
            },
        },
    },
};

// New stories demonstrating config object approach
export const ConfigObjectDemo: Story = {
    args: {
        imageSrc: 'https://picsum.photos/800/600',
        toolbarConfig: {
            show: true,
            position: 'bottom',
            visibleTools: ['rotateLeft', 'rotateRight', 'zoomIn', 'zoomOut', 'reset'],
            tooltips: {
                rotateLeft: 'Rotate counterclockwise',
                rotateRight: 'Rotate clockwise',
                zoomIn: 'Zoom in to image',
                zoomOut: 'Zoom out from image',
                reset: 'Reset to original state',
            }
        },
        canvasConfig: {
            background: true,
            themeColor: '#ff6b6b',
            scaleStep: 0.2,
        },
        selectionConfig: {
            aspectRatio: 16/9,
            initialCoverage: 0.7,
            outlined: true,
            resizable: true,
            movable: true,
        },
        gridConfig: {
            rows: 4,
            columns: 4,
            bordered: true,
            themeColor: 'rgba(255, 107, 107, 0.3)',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the new config object approach. Use toolbarConfig, canvasConfig, selectionConfig, etc. instead of individual properties for cleaner code and better organization.',
            },
        },
    },
};

export const PartialConfigMerging: Story = {
    args: {
        imageSrc: 'https://picsum.photos/800/600',
        // Individual properties still work
        showToolbar: true,
        toolbarPosition: 'top',
        // Config objects override and merge with individual properties
        toolbarConfig: {
            visibleTools: ['crop', 'reset'], // Only show crop and reset buttons
            icons: {
                crop: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7,17V1H5V5H1V7H5V17A2,2 0 0,0 7,19H17V23H19V19H23V17H7M19,7V17H9V15H17A2,2 0 0,0 19,13V7H19Z" /></svg>',
                reset: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,4C14,4 16,5 17,7H20A1,1 0 0,1 21,8A1,1 0 0,1 20,9H18C18,10 18,11 17,12C16,14 14,15 12,15C10,15 8,14 7,12C6,10 6,8 7,7C8,5 10,4 12,4M12,6A3,3 0 0,0 9,9A3,3 0 0,0 12,12A3,3 0 0,0 15,9A3,3 0 0,0 12,6Z" /></svg>',
            }
        },
        // Override individual selection properties with config
        selectionAspectRatio: 1, // This will be overridden by selectionConfig
        selectionConfig: {
            aspectRatio: 4/3, // This takes precedence
            initialCoverage: 0.8,
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows how config objects merge with and override individual properties. Config objects have higher priority than individual properties.',
            },
        },
    },
};

export const CustomToolbarOnly: Story = {
    args: {
        imageSrc: 'https://picsum.photos/800/600',
        toolbarConfig: {
            show: true,
            position: 'bottom',
            visibleTools: ['crop'],
            icons: {
                crop: '🔥', // Using emoji as icon
            },
            tooltips: {
                crop: 'Apply the crop',
            }
        },
        // Hide all other UI elements for minimal look
        gridConfig: { hidden: true },
        crosshairConfig: { hidden: true },
        handlesHidden: true,
        selectionConfig: {
            outlined: true,
            aspectRatio: 1,
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Ultra-minimal cropper with only a custom crop button. Shows how to create a very clean UI using config objects.',
            },
        },
    },
};
