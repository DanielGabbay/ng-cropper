import { bootstrapApplication } from '@angular/platform-browser';
import { NgCropperPlaygroundApp } from './app/NgCropperPlaygroundApp';
import { appConfig } from './app/app.config';

bootstrapApplication(NgCropperPlaygroundApp, appConfig).catch((err) =>
  console.error(err)
);
