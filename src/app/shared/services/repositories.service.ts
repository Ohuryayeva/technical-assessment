import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {repositoriesUrl} from '../../app.constants';
import {ApiResponse} from '../models/api-response.model';
import {RepositoryItem} from '../models/repository-item.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {handleError} from '../utils/helpers';
import {withCache} from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  constructor(public http: HttpClient, private snackbar: MatSnackBar) {
  }

  fetchList(searchItem: string): Observable<RepositoryItem[]> {
    const options =
      {
        params: new HttpParams().set('q', searchItem),
          //explicitly set cashing
        context: withCache()
      };

    return this.http.get<ApiResponse>(repositoriesUrl, options)
      .pipe(
        map((response) => {
          return response.items
        }),
        catchError((error: HttpErrorResponse) => throwError(() => {
            handleError(error, this.snackbar);
            return of([] as RepositoryItem[]);
          })
        ));
  }
}

