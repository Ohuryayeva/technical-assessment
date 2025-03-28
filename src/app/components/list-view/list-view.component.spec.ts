import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {ListViewComponent} from './list-view.component';
import {RepositoriesService} from '../../shared/services/repositories.service';
import {of} from 'rxjs';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;
  let repositoriesService: jasmine.SpyObj<RepositoriesService>;

  beforeEach(async () => {
    const repositoriesServiceSpy = jasmine.createSpyObj('RepositoriesService', ['fetchList']);

    await TestBed.configureTestingModule({
      imports: [ListViewComponent],
      providers: [{provide: RepositoriesService, useValue: repositoriesServiceSpy}]
    }).compileComponents();

    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    repositoriesService = TestBed.inject(RepositoriesService) as jasmine.SpyObj<RepositoriesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchList when search term length > 2', fakeAsync(() => {
    const mockData = [
      {
        id: 1,
        url: 'https://github.com/example',
        description: 'Test Repository',
        name: 'Test',
        owner: {
          login: 'test user',
          id: 1,
        },
        html_url: 'https://github.com/example',
        created_at: '2010-09-04T01:21:12Z',
        updated_at: '"2010-09-04T01:21:12Z"',
        language: 'Javascript',
      }];
    repositoriesService.fetchList.and.returnValue(of(mockData));

    component.repositoriesList$.subscribe()

    component.searchRepositories({target: {value: 'test'}} as unknown as Event);

    fixture.detectChanges()
    flush();

    expect(repositoriesService.fetchList).toHaveBeenCalledWith('test');
  }));

  it('should not call fetchList when search term length <= 2', fakeAsync(() => {
    component.searchRepositories({target: {value: 'te'}} as unknown as Event);
    tick(250);

    expect(repositoriesService.fetchList).not.toHaveBeenCalled();
  }));

  it('should open a new window when calling openSelectedRepository', () => {
    spyOn(window, 'open');
    const url = 'https://github.com/example';

    component.openSelectedRepository(url);

    expect(window.open).toHaveBeenCalledWith(url, '_blank');
  });
});
