import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddRecipeService } from '@services/add-recipe/add-recipe.service';
import { NgxEditorJs2Component } from '@tmdjr/ngx-editor-js2';
import { combineLatest, map } from 'rxjs';
import { TEST_DATA } from '../../services/add-recipe/add-recipe.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-recipe',
  imports: [AsyncPipe, NgxEditorJs2Component, MatButtonModule],
  template: `
    @if (viewModel$ | async; as vm) {
      <button mat-button (click)="saveRecipe()">Save Data</button>
    <ngx-editor-js2
      [blocks]="vm.blocks"
      [requestBlocks]="vm.requestBlocks"
      (blocksRequested)="addRecipeService.handleBlocks($event)"
    ></ngx-editor-js2>
    }
  `,
  styles: `:host { width: 40rem;}`,
})
export class AddRecipeComponent {
  addRecipeService = inject(AddRecipeService);

  viewModel$ = combineLatest([
    this.addRecipeService.ngxEditorJsBlocks$,
    this.addRecipeService.requestBlocks$,
  ]).pipe(
    map(([blocks, requestBlocks]) => {
      
      return { blocks, requestBlocks };
    })
  );

  saveRecipe() {
    this.addRecipeService.requestBlocks.next({});
  }

 loadContent() {
    this.addRecipeService.ngxEditorJsBlocks.next(TEST_DATA);
  }
}
