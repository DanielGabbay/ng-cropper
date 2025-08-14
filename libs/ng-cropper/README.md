# @dg/ng-cropper

An Angular image cropper built on the cropperjs Web Components. Fully customizable and now with an optional built-in toolbar.

## Installation

Peer dependencies:
- Angular 20+

Install in your workspace root:

```bash
pnpm add @dg/ng-cropper
```

## Quick start

In a standalone component:

```ts
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

## Inputs overview

- showToolbar: boolean — show the built-in toolbar (default false)
- toolbarPosition: 'top' | 'bottom' — toolbar position (default 'bottom')
- Canvas: canvasHidden, canvasBackground, canvasDisabled, canvasScaleStep, canvasThemeColor
- Image: imageHidden, imageRotatable, imageScalable, imageSkewable, imageTranslatable, imageInitialCenterSize, imageSrc, imageAlt
- Selection: selectionHidden, selectionX, selectionY, selectionWidth, selectionHeight, selectionAspectRatio, selectionInitialAspectRatio, selectionInitialCoverage, selectionDynamic, selectionMovable, selectionResizable, selectionZoomable, selectionMultiple, selectionKeyboard, selectionOutlined, selectionPrecise
- Grid: gridHidden, gridRows, gridColumns, gridBordered, gridCovered, gridThemeColor
- Crosshair: crosshairHidden, crosshairCentered, crosshairThemeColor
- Handles: handlesHidden, handlesThemeColor

## Public API methods

Cropper instance exposes helpers like: toCanvas, selectionToCanvas, selectionToDataURL, selectionToBlob, centerImage, resetImageTransform and more. See the source for the full list.

## Examples

See the playground app and Storybook stories for examples of different configurations and usage patterns.

## Contributing / Development

- Dev playground: nx serve ng-cropper-playground
- Storybook: nx storybook ng-cropper
- Build library: nx build ng-cropper
- Test: nx test ng-cropper

## License

MIT
