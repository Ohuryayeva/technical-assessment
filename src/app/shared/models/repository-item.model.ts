export interface RepositoryItem {
  id: number;
  url: string;
  name:string;
  owner: Owner;
  html_url: string;
  created_at: string;
  updated_at: string;
  description: string;
  language: string;
}

interface Owner {
  login: string;
  id: number;
}
