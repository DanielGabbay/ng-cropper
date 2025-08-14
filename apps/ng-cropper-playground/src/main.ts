import { bootstrapApplication } from '@angular/platform-browser';
import { NgCropperPlaygroundApp } from './app/NgCropperPlaygroundApp';
import { appConfig } from './app/app.config';
import { provideCropperJS } from '@dg/ng-cropper';

// Initialize CropperJS before bootstrapping
provideCropperJS().then(() => {
  bootstrapApplication(NgCropperPlaygroundApp, appConfig).catch((err) =>
    console.error(err)
  );
}).catch((err) => {
  console.error('Failed to initialize CropperJS:', err);
});
