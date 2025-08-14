# NgCropper

[![npm version](https://badge.fury.io/js/%40dg%2Fng-cropper.svg)](https://www.npmjs.com/package/@dg/ng-cropper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20%2B-red.svg)](https://angular.io/)

An Angular image cropper library built on the powerful [CropperJS](https://github.com/fengyuanchen/cropperjs) web components. Features a fully customizable interface with an optional built-in toolbar for seamless image cropping experiences.

## 🚀 Features

- **Modern Angular 20+ Support** - Built with the latest Angular features
- **CropperJS Integration** - Leverages the robust CropperJS library
- **Built-in Toolbar** - Optional toolbar with common cropping actions
- **Fully Customizable** - Extensive configuration options
- **TypeScript Ready** - Full TypeScript support with type definitions
- **Responsive Design** - Works seamlessly across devices
- **Zero Configuration** - Works out of the box with sensible defaults

## 📦 Installation

```bash
npm install @dg/ng-cropper
# or
pnpm add @dg/ng-cropper
# or
yarn add @dg/ng-cropper
```

### Peer Dependencies

- `@angular/core`: ^20.1.0
- `@angular/common`: ^20.1.0
- `@angular/platform-browser`: ^20.1.0
- `@angular/elements`: ^20.1.0
- `cropperjs`: ^2.0.1
- `lucide-angular`: ^0.539.0

## 🛠️ Quick Start

```typescript
import { Component } from '@angular/core';
import { NgCropper } from '@dg/ng-cropper';

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

## 📖 Documentation & Examples

- **[Live Demo & Playground](https://danielgabbay.github.io/ng-cropper/playground)** - Interactive examples and configuration
- **[Storybook Documentation](https://danielgabbay.github.io/ng-cropper/storybook)** - Comprehensive component documentation
- **[API Reference](./libs/ng-cropper/README.md)** - Complete API documentation

## 🎛️ Configuration Options

The NgCropper component provides extensive configuration through inputs:

### Toolbar
- `showToolbar`: Display built-in toolbar (default: false)
- `toolbarPosition`: Toolbar position - 'top' | 'bottom' (default: 'bottom')

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

# Lint
pnpm lint
# or
nx run-many -t lint
```

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ☕ Support the Project

If NgCropper has been helpful to you, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support%20development-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://www.buymeacoffee.com/danielgabbay)

Your support helps maintain and improve this project!

## 🙏 Acknowledgments

- Built on top of [CropperJS](https://github.com/fengyuanchen/cropperjs) by Fengyuan Chen
- Icons provided by [Lucide](https://lucide.dev/)
- Powered by [Angular](https://angular.io/) and [Nx](https://nx.dev)

---

**[⭐ Star this project](https://github.com/DanielGabbay/ng-cropper)** if you find it useful!