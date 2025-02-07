export interface SavedRecipe {
  id: string,
  info: Recipe
}

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
