import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgxEditorJsBlock } from '@tmdjr/ngx-editor-js2';
import {
  BehaviorSubject,
  lastValueFrom,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';

export const TEST_DATA: NgxEditorJsBlock[] = [
  {
    blockId: 'iovlbzgosf',
    sortIndex: 0,
    componentInstanceName: 'HeaderBlockComponent',
    dataClean: 'Prerequisites',
    savedAction: 'h1',
  },
  {
    blockId: 'n177d7',
    sortIndex: 1,
    componentInstanceName: 'NgxEditorJs2BlockquotesComponent',
    dataClean:
      '"Design is not just what it looks like and feels like. Design is how it works."',
    savedAction: 'display-large',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AddRecipeService {
  private jsonURL = of('assets/add-file.json');
  private readonly http = inject(HttpClient);

  ngxEditorJsBlocks = new BehaviorSubject<NgxEditorJsBlock[]>([]);
  ngxEditorJsBlocks$ = this.jsonURL.pipe(
    mergeMap((url) => this.http.get<any[]>(url)),
    tap((addFileData) => this.ngxEditorJsBlocks.next(addFileData))
  );

  requestBlocks = new BehaviorSubject<{}>({});
  requestBlocks$ = this.requestBlocks.asObservable();

  handleBlocks(blocks$: Observable<NgxEditorJsBlock[]>) {
    void lastValueFrom(blocks$.pipe(tap(console.table)));
  }
}
