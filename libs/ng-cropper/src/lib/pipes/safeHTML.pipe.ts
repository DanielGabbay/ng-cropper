import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'safeHTML',
    pure: true,
    // Standalone pipes are supported in Angular 14+
    standalone: true,
})
export class SafeHTMLPipe implements PipeTransform {
    private readonly domSanitizer = inject(DomSanitizer);

    transform(value: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(value);
    }
}
