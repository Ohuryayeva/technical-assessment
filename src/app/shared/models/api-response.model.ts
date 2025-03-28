import {RepositoryItem} from './repository-item.model';

export interface ApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: RepositoryItem[]
}
