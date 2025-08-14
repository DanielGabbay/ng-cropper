import {ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';

@Component({
  selector: 'ngCropper',
  imports: [],
  templateUrl: './NgCropper.html',
  styleUrl: './NgCropper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgCropper implements OnInit {
  
  async ngOnInit() {
    // Dynamic import to load CropperJS web components
    await import('cropperjs');
  }
}
