import { Component, inject, Input } from '@angular/core';
import { SavedRecipe } from './models/recipe';
import { RecipeService } from '../../services/recipe/recipe.service';
import { combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if(viewModel$ | async; as vm) { @if(vm.recipe) {
    <h1 class="d-flex justify-content-evenly">{{ vm.recipe.name }}</h1>
    <p class="d-flex justify-content-evenly">
      Rating: {{ vm.recipe.review.rating }} from
      {{ vm.recipe.review.count }} reviews
    </p>
    <hr />
    <img
      src="https://images.pexels.com/photos/15584737/pexels-photo-15584737/free-photo-of-delicious-scrambled-eggs.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Scrambled Eggs"
      class="w-100 border"
    />
    <hr />
    <p class="d-flex justify-content-evenly">
      Prep Time: {{ vm.recipe.timing.prep }} | Cook Time:
      {{ vm.recipe.timing.cook }} | Total Time: {{ vm.recipe.timing.total }}
    </p>
    <hr />
    <form [formGroup]="vm.servingsForm" class="servings-input mb-3 mt-5">
      <div class="input-group mb-3">
        <span class="input-group-text">Serves:</span>
        <input
          type="number"
          class="form-control"
          aria-label="Number of servings"
          formControlName="servings"
          min="1"
          max="20"
        />
      </div>
    </form>
    <div class="mb-3">
      <strong>Ingredients:</strong> <br />
      <ul>
        @for (ingredient of vm.recipe.ingredients; track ingredient) {
        <li>
          {{
            ingredient.quantity
              ? ingredient.quantity *
                (vm.servingsForm.get('servings')?.value ?? 1)
              : ''
          }}
          {{ ingredient.unit ? ingredient.unit : '' }} {{ ingredient.name }}
        </li>
        }
      </ul>
    </div>
    <div class="mb-3">
      <strong>Instructions:</strong> <br />
      <ol>
        @for (instruction of vm.recipe.instructions; track instruction) {
        <li>{{ instruction }}</li>
        }
      </ol>
    </div>
    } }
  `,
  styles: `
    :host {
      display: block;
      max-width: 35rem;
      border: 1px solid grey;
      padding: 3rem;
    }

    .servings-input {
      width: 9rem;
    }
  `,
})
export class RecipeCardComponent {
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
        servingsForm: new FormGroup({
          servings: new FormControl(savedRecipe?.info.servings),
        }),
      };
    })
  );
}
