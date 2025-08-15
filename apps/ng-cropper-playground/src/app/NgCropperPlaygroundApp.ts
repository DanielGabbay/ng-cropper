import { Component, linkedSignal, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgCropper, NgCropperConfig, NgCropperInitialState } from 'ng-cropper-lib';

@Component({
    imports: [NgCropper, FormsModule],
    standalone: true,
    selector: 'ngCropperPlaygroundApp',
    templateUrl: './NgCropperPlaygroundApp.html',
    schemas: [],
})
export class NgCropperPlaygroundApp {
    protected title = 'NgCropper-playground';

    // Reference to the cropper component
    public readonly cropperRef = viewChild.required<NgCropper>('cropper');

    // Default values matching Storybook configuration
    readonly NaN = Number.NaN;

    public readonly config = linkedSignal<NgCropperConfig>(() => {
        return NgCropperInitialState;
    });

    public configJsonString = linkedSignal<string>(() => {
        // Convert NaN values to null for valid JSON
        const configCopy = JSON.parse(
            JSON.stringify(this.config(), (key, value) => {
                return Number.isNaN(value) ? null : value;
            })
        );
        return JSON.stringify(configCopy, null, 2);
    });

    public showConfigEditor = signal<boolean>(false);

    constructor() {
        // Empty constructor
    }

    // Handle file upload
    protected onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageSrc = e.target?.result as string;
                this.config.update((config) => ({
                    ...config,
                    image: {
                        ...config.image,
                        src: imageSrc,
                    },
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    // Apply configuration from JSON
    protected applyConfig() {
        try {
            const configString = this.configJsonString().trim();
            if (!configString) {
                alert('Please enter a JSON configuration.');
                return;
            }

            const parsedConfig = JSON.parse(configString, (key, value) => {
                // Convert null back to NaN for numeric fields that expect NaN
                if (value === null && ['x', 'y', 'width', 'height', 'aspectRatio', 'initialAspectRatio'].includes(key)) {
                    return NaN;
                }
                return value;
            }) as NgCropperConfig;

            // Basic validation - ensure it's an object
            if (typeof parsedConfig !== 'object' || parsedConfig === null || Array.isArray(parsedConfig)) {
                alert('Configuration must be a valid JSON object.');
                return;
            }

            this.config.set(parsedConfig);
        } catch (error) {
            alert('Invalid JSON format. Please check your syntax and try again.');
            console.error('JSON parse error:', error);
        }
    }

    // Reset to default configuration
    protected resetConfig() {
        this.config.set(NgCropperInitialState);
    }

    // Update JSON string when config changes
    protected updateJsonString() {
        // Convert NaN values to null for valid JSON
        const configCopy = JSON.parse(
            JSON.stringify(this.config(), (key, value) => {
                return Number.isNaN(value) ? null : value;
            })
        );
        this.configJsonString.set(JSON.stringify(configCopy, null, 2));
    }

    // Toggle config editor visibility
    protected toggleConfigEditor() {
        this.showConfigEditor.update((show) => !show);
    }
}
