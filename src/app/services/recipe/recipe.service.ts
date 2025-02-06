import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, of, tap } from 'rxjs';
import { SavedRecipe } from '../../shared/recipe-card/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly http = inject(HttpClient)
  private jsonURL = of('assets/data.json');
  
  private readonly dataSubject = new BehaviorSubject<SavedRecipe[] | undefined>(undefined);
  dataRaw$ = this.dataSubject.asObservable();

  data$ = this.jsonURL.pipe(
    mergeMap(url => this.http.get<SavedRecipe[]>(url)),
    tap(savedRecipes => this.dataSubject.next(savedRecipes))
  )
}
