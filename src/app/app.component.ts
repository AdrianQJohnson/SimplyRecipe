import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeComponent } from './pages/recipe/recipe.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecipeComponent],
  template: `
    <main class="main">
      <div class="content">
        <router-outlet />
        <app-recipe></app-recipe>
      </div>
    </main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simplyrecipe';
}
