import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { combineEpics } from 'redux-observable';

const addTodoEpic = (action$) =>
  action$.pipe(
    ofType('ADD_TODO_REQUEST'),
    mergeMap((action) =>
      ajax
        .post('/api/todos', action.payload, {
          'Content-Type': 'application/json',
        })
        .pipe(
          map((response) => ({
            type: 'ADD_TODO',
            payload: response.response,
          })),
          catchError((error) => of({ type: 'ADD_TODO_ERROR', payload: error }))
        )
    )
  );

export const rootEpic = combineEpics(addTodoEpic);