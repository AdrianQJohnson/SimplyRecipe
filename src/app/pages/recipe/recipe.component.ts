import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../shared/recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe',
  imports: [RecipeCardComponent],
  template: `
    <div class="content d-flex justify-content-center pt-5">
      <app-recipe-card></app-recipe-card>
    </div>
  `,
  styles: `
    .content {
      max-width: 40rem;
      margin: 0 auto;
    }
  `,
})
export class RecipeComponent {}
