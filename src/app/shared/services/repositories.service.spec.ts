import {TestBed} from '@angular/core/testing';

import {RepositoriesService} from './repositories.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('RepositoriesService', () => {
  let service: RepositoriesService;
  let httpMock: HttpTestingController;
  const mockResponse = {
    items: [
      {
        id: 1,
        url: 'https://github.com/example',
        description: 'Test Repository',
        name:'Test',
        owner: {
          login: 'test user',
          id: 1,
        },
        html_url: 'https://github.com/example',
        created_at: '2010-09-04T01:21:12Z',
        updated_at: '"2010-09-04T01:21:12Z"',
        language: 'Javascript',
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(RepositoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch repository list successfully', () => {
    service.fetchList('test').subscribe(items => {
      expect(items.length).toEqual(1);
      expect(items.length).toBe(1);
      expect(items[0].url).toBe('https://github.com/example');
    });

    const req = httpMock.expectOne(`https://api.github.com/search/repositories?q=test`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

});
