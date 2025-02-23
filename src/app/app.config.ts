import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NGX_EDITORJS_OPTIONS } from '@tmdjr/ngx-editor-js2';
import { NgxEditorJs2ImageComponent } from '@tmdjr/ngx-editor-js2-image';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: NGX_EDITORJS_OPTIONS,
      useValue: {
        consumerSupportedBlocks: [
          {
            // Customize the block name.
            name: 'Image',
            component: NgxEditorJs2ImageComponent,
            // Must match the component name.
            componentInstanceName: 'NgxEditorJs2ImageComponent',
          },
        ],
      },
    },
  ],
};
