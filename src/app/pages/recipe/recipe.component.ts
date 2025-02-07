import { Component, inject } from '@angular/core';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  imports: [CommonModule, RecipeCardComponent],
  template: `
    @if(viewModel$ | async; as vm) {
      @if(vm.recipeRoute) {
        <div class="content d-flex justify-content-center my-5">
          <app-recipe-card [route]="vm.recipeRoute"></app-recipe-card>
        </div>
      }
    }
  `,
  styles: `
    .content {
      max-width: 40rem;
      margin: 0 auto;
    }
  `,
})
export class RecipeComponent {
  route = inject(ActivatedRoute);

  viewModel$ = combineLatest({
    params: this.route.params,
  }).pipe(
    map(({ params }) => {
      return {
        recipeRoute: params['route']
      };
    })
  );
}
