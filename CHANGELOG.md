# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-08-15

### Added
- **Enhanced Configuration Architecture** - Introduced comprehensive config object approach
  - `toolbarConfig` - Complete toolbar configuration with icons, visibility, and tooltips
  - `canvasConfig`, `imageConfig`, `selectionConfig`, `gridConfig`, `crosshairConfig` - Dedicated config objects for each component
  - `mergeConfigurations` utility for intelligent config merging with priority handling
  - Support for both individual properties and config objects (config objects take precedence)

- **Advanced Toolbar Customization**
  - `ToolbarConfig` type with full icon, tooltip, and visibility control
  - `visibleTools` array/Set to control which toolbar buttons are shown
  - Support for FontAwesome, Material Icons, SVG strings, and TemplateRef icons
  - Custom tooltips for each toolbar button
  - Default SVG icons included (no external dependencies required)

- **Enhanced Storybook Documentation**
  - New stories demonstrating config object approach (`ConfigObjectDemo`, `PartialConfigMerging`)
  - Custom icon examples with FontAwesome and Material Icons
  - `CustomToolbarOnly` story showing minimal UI approach
  - Comprehensive controls for all configuration options

### Fixed
- Added missing `@angular/platform-browser` to peerDependencies to resolve dependency check warnings

### Changed
- **Breaking**: `ToolbarToolType` moved from `default-toolbat-icons.const.ts` to `toolbar.config.ts`
- Improved component architecture with computed signals for reactive configuration merging
- Enhanced type safety with strict TypeScript configuration types

## [1.0.0] - 2025-08-15

### Added
- Enhanced toolbar functionality with dynamic tool visibility and SVG icons
- Support for custom icon templates (FontAwesome, Material Icons, SVG)
- Zero dependencies approach - no external icon libraries required
- Comprehensive TypeScript configuration with strict typing
- Full Storybook documentation with interactive examples
- Built-in toolbar with common cropping actions (rotate, zoom, crop, reset)
- Complete Angular 20+ compatibility with modern features

### Changed
- Updated package name to `ng-cropper-lib` for NPM publishing
- Improved Angular version compatibility (17.1+ peer dependencies)
- Enhanced documentation with detailed examples and configuration options
- Streamlined API with better default values and type safety

### Features
- **Modern Angular Support** - Built with Angular 20+ features
- **CropperJS Integration** - Leverages robust CropperJS library
- **Customizable Toolbar** - Optional toolbar with flexible icon support
- **TypeScript Ready** - Full type definitions and strict typing
- **Responsive Design** - Works seamlessly across devices
- **Extensive Configuration** - Canvas, image, selection, grid, and handle customization

### Technical Improvements
- Jest testing configuration for ng-cropper-playground
- Updated build configuration with Angular build executor
- Enhanced project structure with proper path configurations
- Improved ESLint configuration with Angular-specific rules

## [0.x.x] - Previous Versions

Initial development versions with basic cropping functionality.