import { Routes } from '@angular/router';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
    { path: 'recipe/:route', component: RecipeComponent },
    { path: 'recipe/add-recipe', component: RecipeComponent },
    { path: 'category/:category', component: CategoryComponent },
];
