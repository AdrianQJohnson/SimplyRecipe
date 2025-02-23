export interface SavedRecipe {
  id: string;
  info: Recipe;
  metadata: RecipeMetadata;
}

export interface Recipe {
  name: string;
  image: string;
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

export interface RecipeMetadata {
  author: string;
  createdDate: string;
  tags: string[];
}
