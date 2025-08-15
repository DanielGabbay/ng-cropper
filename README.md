# NgCropper

[![npm version](https://badge.fury.io/js/ng-cropper-lib.svg)](https://www.npmjs.com/package/ng-cropper-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-17.1%2B-red.svg)](https://angular.io/)

> Modern Angular image cropper library built on [CropperJS](https://github.com/fengyuanchen/cropperjs) with enhanced configuration architecture and optional built-in toolbar.

## 🚀 Quick Links

- **[📚 Documentation & API](https://danielgabbay.github.io/ng-cropper/storybook/)** - Complete Storybook documentation
- **[🎮 Live Playground](https://danielgabbay.github.io/ng-cropper/playground/)** - Interactive demo
- **[📦 NPM Package](https://www.npmjs.com/package/ng-cropper-lib)** - Install the library
- **[📋 Changelog](./CHANGELOG.md)** - Release notes and updates

## ✨ Features

- **🎯 Zero Dependencies** - Built-in SVG icons, no external icon libraries required
- **⚡ Modern Angular** - Supports Angular 17.1+ with latest features
- **🎨 Highly Customizable** - Comprehensive configuration objects for every component
- **🛠️ Built-in Toolbar** - Optional toolbar with customizable icons and actions
- **📱 Responsive** - Works seamlessly across all devices
- **💪 TypeScript Ready** - Full type definitions and strict typing
- **🎛️ Flexible API** - Both individual properties and config objects supported

## 📦 Installation

```bash
npm install ng-cropper-lib
# or
pnpm add ng-cropper-lib
# or
yarn add ng-cropper-lib
```

## 🚀 Quick Start

```typescript
import { Component } from '@angular/core';
import { NgCropper } from 'ng-cropper-lib';

@Component({
  selector: 'app-demo',
  imports: [NgCropper],
  template: `
    <ngCropper
      [imageSrc]="'https://picsum.photos/800/600'"
      [showToolbar]="true"
      toolbarPosition="bottom"
      [selectionInitialCoverage]="0.6"
    />
  `
})
export class DemoComponent {}
```

## 🏗️ Project Structure

This monorepo contains multiple packages and applications:

```
ng-cropper/
├── libs/ng-cropper/              # 📦 Main library package
│   ├── src/lib/                  # Library source code
│   ├── README.md                 # Library documentation
│   └── package.json              # NPM package configuration
├── apps/ng-cropper-playground/   # 🎮 Demo application
├── .github/workflows/            # 🚀 CI/CD automation
│   ├── deploy.yml                # Deploy docs & demo
│   └── publish.yml               # Publish to NPM
├── CHANGELOG.md                  # 📋 Release notes
└── README.md                     # This file
```

### 📦 Library (`libs/ng-cropper/`)

The main Angular library package published to NPM as [`ng-cropper-lib`](https://www.npmjs.com/package/ng-cropper-lib).

- **Source**: `libs/ng-cropper/src/lib/`
- **Documentation**: [Storybook](https://danielgabbay.github.io/ng-cropper/storybook/)
- **Package**: [`ng-cropper-lib`](https://www.npmjs.com/package/ng-cropper-lib)

### 🎮 Demo Application (`apps/ng-cropper-playground/`)

Interactive demo application showcasing the library features.

- **Live Demo**: [ng-cropper-playground](https://danielgabbay.github.io/ng-cropper/playground/)
- **Source**: `apps/ng-cropper-playground/src/`

## 🛠️ Development

This project uses [Nx](https://nx.dev) for workspace management.

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Setup

```bash
# Clone the repository
git clone https://github.com/DanielGabbay/ng-cropper.git
cd ng-cropper

# Install dependencies
pnpm install
```

### Development Commands

```bash
# Start development playground
pnpm dev

# Start Storybook documentation
pnpm storybook

# Build library
pnpm build:lib

# Run tests
pnpm test:lib

# Lint code
pnpm lint
```

## 🚀 Deployment

### Automated CI/CD

This project uses GitHub Actions for automated deployment:

- **📚 Documentation & Demo**: Auto-deployed to GitHub Pages on every push to `master`
- **📦 NPM Publishing**: Auto-published when creating a GitHub release

### Manual Publishing

```bash
# Build the library
pnpm build:lib

# Publish to NPM
cd dist/libs/ng-cropper
npm publish
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ☕ Support the Project

If NgCropper has been helpful to you, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support%20development-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/danielgabbay)

Your support helps maintain and improve this project!

## 🙏 Acknowledgments

- Built on top of [CropperJS](https://github.com/fengyuanchen/cropperjs) by Fengyuan Chen
- Powered by [Angular](https://angular.io/) and [Nx](https://nx.dev)

---

**[⭐ Star this project](https://github.com/DanielGabbay/ng-cropper)** if you find it useful!
