import { Component, inject, Input } from '@angular/core';
import { SavedRecipe } from '../../../shared/models/recipe';
import { RecipeService } from '@services/recipe/recipe.service';
import { combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-summary-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    @if (viewModel$ | async; as vm) { @if (vm.recipe) {
      <div class="col">
        <div class="card h-100">
          <img
            [src]="vm.recipe.image"
            class="card-img-top"
            alt="Photo of {{ vm.recipe.name }}"
          />
          <div class="card-body">
            <h5 class="card-title">{{ vm.recipe.name }}</h5>
            <p class="card-text">
              Rating: {{ vm.recipe.review.rating }} from
              {{ vm.recipe.review.count }} reviews
            </p>
            <button mat-button>LIKE</button>
            <button mat-button>SHARE</button>
          </div>
        </div>
      </div>
    } }
  `,
  styles: `
    img {
      object-fit: cover;
      aspect-ratio: 16/9;
    }
  `
})
export class RecipeSummaryComponent {
  @Input() route: string = '';

  recipeService = inject(RecipeService);

  viewModel$ = combineLatest({
    data: this.recipeService.data$,
  }).pipe(
    map(({ data }) => {
      const savedRecipe = data.find(
        (recipe: SavedRecipe) => recipe.id === this.route
      );
      return {
        recipe: savedRecipe ? savedRecipe.info : undefined,
      };
    })
  );
}
