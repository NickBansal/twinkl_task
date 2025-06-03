export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface DataContextType {
  filteredPosts: Post[];
  loading: boolean;
  error: boolean;
  removePost: (id: number) => void;
  searchPostsByTitle: (query: string) => void;
}
