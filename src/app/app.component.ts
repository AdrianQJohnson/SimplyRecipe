import { Component } from '@angular/core';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  template: `
    <app-navigation />
    <main class="main">
      <router-outlet />
    </main>
  `
})
export class AppComponent {
}
