import {Component} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  iif,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import {AsyncPipe, DatePipe} from '@angular/common';
import {RepositoriesService} from '../../shared/services/repositories.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardContent} from '@angular/material/card';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'list-view',
  imports: [
    AsyncPipe,
    MatInput,
    MatCard,
    MatLabel,
    MatCardContent,
    MatFormField,
    FormsModule,
    DatePipe
  ],
  templateUrl: './list-view.component.html',
  standalone: true,
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
  constructor(private repositoriesService: RepositoriesService) {
  }

  private searchItem = new Subject<string>();

  repositoriesList$ = this.searchItem.pipe(
    debounceTime(250), // prevent api to be spammed by fast typing
    distinctUntilChanged(),
    switchMap(element => iif(() => element.length > 2,
      this.repositoriesService.fetchList(element),
      of([])),
    ));
  searchTerm ='';

  searchRepositories(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchItem.next(value);
  }

  openSelectedRepository(url: string) {
    window.open(url, '_blank');
  }
}
