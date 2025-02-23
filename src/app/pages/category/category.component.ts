import { Component, inject } from '@angular/core';
import { RecipeSummaryComponent } from './recipe-summary/recipe-summary.component';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SavedRecipe } from '../../shared/models/recipe';
import { RecipeService } from '@services/recipe/recipe.service';

@Component({
  selector: 'app-category',
  imports: [CommonModule, RecipeSummaryComponent],
  template: `
    @if (viewModel$ | async; as vm) {
    <div class="container my-5">
      <div class="text-center">
        <h2 style="text-transform: uppercase">Recipes</h2>
      </div>
      <div class="recipe-list row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 pb-3 my-3">
        @for (recipe of vm.recipes; track recipe) {
          <app-recipe-summary-card
            [route]="recipe.id"
          ></app-recipe-summary-card>
        }
      </div>
    </div>
    }
  `,
  styles: `
    .container {
      max-width: 60rem;
    }

    .recipe-list {
      background-color: #f8f9fa;
    }
  `,
})
export class CategoryComponent {
  route = inject(ActivatedRoute);
  recipeService = inject(RecipeService);

  viewModel$ = combineLatest({
    params: this.route.params,
    data: this.recipeService.data$,
  }).pipe(
    map(({ params, data }) => {
      return {
        categoryRoute: params['category'],
        recipes: data.filter((recipe: SavedRecipe) =>
          recipe.metadata.tags.includes(params['category'])
        ),
      };
    })
  );
}
