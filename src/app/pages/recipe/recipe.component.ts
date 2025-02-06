import { Component, Input } from '@angular/core';

export interface Recipe {
  name: string;
  review: Review;
  timing: Timing;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
}

export interface Review {
  rating: number;
  count: number;
}

export interface Timing {
  prep: string;
  cook: string;
  total: string;
}

export interface Ingredient {
  name: string;
  quantity?: number;
  unit?: string;
}

@Component({
  selector: 'app-recipe',
  imports: [],
  template: `
    <h1>{{ recipe.name }}</h1>
    <div class="">
      Rating: {{ recipe.review.rating }} from {{ recipe.review.count }} reviews
    </div>
    <p>
      Prep Time: {{ recipe.timing.prep }} | Cook Time:
      {{ recipe.timing.cook }} | Total Time: {{ recipe.timing.total }}
    </p>
    <p>Serves: {{ recipe.servings }}</p>
    <div>
      <strong>Ingredients:</strong> <br />
      <ul>
        @for (ingredient of recipe.ingredients; track ingredient) {
        <li>
          {{ ingredient.quantity ? ingredient.quantity : '' }}
          {{ ingredient.unit ? ingredient.unit : '' }} {{ ingredient.name }}
        </li>
        }
      </ul>
    </div>
    <div>
      <strong>Instructions:</strong> <br />
      <ol>
        @for (instruction of recipe.instructions; track instruction) {
        <li>{{ instruction }}</li>
        }
      </ol>
    </div>
  `,
  styles: `
    :host {
      display: block;
      max-width: 30rem;
      border: 1px solid grey;
      padding: 3rem;
    }
  `,
})
export class RecipeComponent {
  @Input() recipe: Recipe = {
    name: 'Scrambled Eggs',
    review: {
      rating: 4.67,
      count: 396,
    },
    timing: {
      prep: '30 mins',
      cook: '15 mins',
      total: '45 mins',
    },
    servings: 4,
    ingredients: [
      {
        name: 'Eggs',
        quantity: 3,
      },
      {
        name: 'Salt, to taste',
      },
      {
        name: 'Olive Oil',
        quantity: 1,
        unit: 'tablespoon',
      },
    ],
    instructions: [
      'Crack the eggs into a medium bowl and add the milk or water. Whisk until smooth and combined, with no streaks of egg white remaining.',
      'Brush a small nonstick skillet with olive oil, or melt a little butter in a small nonstick skillet. Bring to medium heat.',
      'Pour in the eggs, and let them cook for a few seconds without stirring. Pull a rubber spatula across the bottom of the pan to form large, soft curds of scrambled eggs.',
      'Continue cooking over medium-low heat, folding and stirring the eggs every few seconds. Scrape the spatula along the bottom and sides of the pan often to form more curds and to prevent any part of the eggs from drying out.',
      'Remove the pan from the heat when the eggs are mostly set, but a little liquid egg remains. Season to taste with salt and pepper and garnish with chopped fresh chives, if desired.',
    ],
  };
}
