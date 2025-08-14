import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxWelcome } from "./nx-welcome";
import { NgCropper } from "@dg/ng-cropper";

@Component({
  imports: [NxWelcome, RouterModule, NgCropper],
  selector: "ngCropperPlaygroundApp",
  templateUrl: "./NgCropperPlaygroundApp.html",
  styleUrl: "./NgCropperPlaygroundApp.scss",
  schemas: [],
})
export class NgCropperPlaygroundApp {
  protected title = "NgCropper-playground";
}
