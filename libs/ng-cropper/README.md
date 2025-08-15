# ng-cropper-lib

[![npm version](https://badge.fury.io/js/ng-cropper-lib.svg)](https://www.npmjs.com/package/ng-cropper-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-17.1%2B-red.svg)](https://angular.io/)

An Angular image cropper library built on the powerful [CropperJS](https://github.com/fengyuanchen/cropperjs) web components. Features a fully customizable interface with an optional built-in toolbar for seamless image cropping experiences.

## 🚀 Features

- **Modern Angular 20+ Support** - Built with the latest Angular features
- **CropperJS Integration** - Leverages the robust CropperJS library
- **Built-in Toolbar** - Optional toolbar with common cropping actions
- **Customizable Icons** - Support for FontAwesome, Material Icons, SVG, or custom templates
- **Fully Customizable** - Extensive configuration options
- **TypeScript Ready** - Full TypeScript support with type definitions
- **Responsive Design** - Works seamlessly across devices
- **Zero Dependencies** - No additional icon libraries required

## 📦 Installation

```bash
npm install ng-cropper-lib
# or
pnpm add ng-cropper-lib
# or
yarn add ng-cropper-lib
```

The library includes `cropperjs` as a dependency - no need to install it separately!

## 🛠️ Quick Start

```typescript
import { Component } from '@angular/core';
import { NgCropper } from 'ng-cropper-lib';

@Component({
  selector: 'app-demo',
  imports: [NgCropper],
  template: `
    <ngCropper
      [imageSrc]="'https://picsum.photos/800/600'"
      [selectionInitialCoverage]="0.6"
      [showToolbar]="true"
      toolbarPosition="bottom"
    />
  `
})
export class DemoComponent {}
```

## 🎨 Custom Icons

The toolbar supports multiple icon formats:

### FontAwesome Icons
```html
<ngCropper
  [showToolbar]="true"
  rotateLeftIcon="fas fa-undo"
  rotateRightIcon="fas fa-redo"
  zoomInIcon="fas fa-search-plus"
  zoomOutIcon="fas fa-search-minus"
  cropIcon="fas fa-crop"
  resetIcon="fas fa-sync-alt"
/>
```

### Material Icons
```html
<ngCropper
  [showToolbar]="true"
  rotateLeftIcon="material-icons rotate_left"
  rotateRightIcon="material-icons rotate_right"
  zoomInIcon="material-icons zoom_in"
  zoomOutIcon="material-icons zoom_out"
  cropIcon="material-icons crop"
  resetIcon="material-icons refresh"
/>
```

### Custom Templates
```typescript
@Component({
  template: `
    <ngCropper
      [showToolbar]="true"
      [rotateLeftIcon]="customRotateIcon"
    />
    
    <ng-template #customRotateIcon>
      <svg><!-- your custom SVG --></svg>
    </ng-template>
  `
})
```

## 🎛️ Configuration Options

### Toolbar
- `showToolbar`: Display built-in toolbar (default: false)
- `toolbarPosition`: Toolbar position - 'top' | 'bottom' (default: 'bottom')
- **Icon Inputs**: `rotateLeftIcon`, `rotateRightIcon`, `zoomInIcon`, `zoomOutIcon`, `cropIcon`, `resetIcon`

### Canvas
- `canvasHidden`, `canvasBackground`, `canvasDisabled`, `canvasScaleStep`, `canvasThemeColor`

### Image
- `imageSrc`, `imageAlt`, `imageHidden`, `imageRotatable`, `imageScalable`, `imageSkewable`
- `imageTranslatable`, `imageInitialCenterSize`

### Selection
- `selectionHidden`, `selectionX`, `selectionY`, `selectionWidth`, `selectionHeight`
- `selectionAspectRatio`, `selectionInitialAspectRatio`, `selectionInitialCoverage`
- `selectionDynamic`, `selectionMovable`, `selectionResizable`, `selectionZoomable`
- `selectionMultiple`, `selectionKeyboard`, `selectionOutlined`, `selectionPrecise`

### Grid & Crosshair
- `gridHidden`, `gridRows`, `gridColumns`, `gridBordered`, `gridCovered`, `gridThemeColor`
- `crosshairHidden`, `crosshairCentered`, `crosshairThemeColor`

### Handles
- `handlesHidden`, `handlesThemeColor`

## 🔧 Public API Methods

The cropper instance exposes powerful methods for programmatic control:

- `toCanvas()` - Export entire canvas to canvas element
- `selectionToCanvas()` - Export selection to canvas element  
- `selectionToDataURL()` - Export selection as data URL
- `selectionToBlob()` - Export selection as blob
- `centerImage()` - Center the image in the canvas
- `resetImageTransform()` - Reset all image transformations

## 📖 Examples

```typescript
// Get cropper reference and export selection
@ViewChild(NgCropper) cropper!: NgCropper;

async exportImage() {
  const canvas = await this.cropper.selectionToCanvas();
  const dataUrl = canvas.toDataURL('image/png');
  // Use dataUrl...
}

// Center and reset image
resetCropper() {
  this.cropper.resetImageTransform();
  this.cropper.centerImage('contain');
}
```

## 🚧 Development

This project uses [Nx](https://nx.dev) for workspace management.

```bash
# Install dependencies
pnpm install

# Development playground
pnpm dev
# or
nx serve ng-cropper-playground

# Storybook development
pnpm storybook
# or  
nx storybook ng-cropper

# Build library
pnpm build:lib
# or
nx build ng-cropper

# Run tests
pnpm test:lib
# or
nx test ng-cropper
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## ☕ Support the Project

If NgCropper has been helpful to you, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support%20development-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/danielgabbay)

Your support helps maintain and improve this project!

## 🙏 Acknowledgments

- Built on top of [CropperJS](https://github.com/fengyuanchen/cropperjs) by Fengyuan Chen
- Powered by [Angular](https://angular.io/) and [Nx](https://nx.dev)

---

**[⭐ Star this project](https://github.com/DanielGabbay/ng-cropper)** if you find it useful!
