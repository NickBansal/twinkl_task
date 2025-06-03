import React, { createContext, useState, useEffect, ReactNode } from "react";
import { DataContextType, Post } from "./types";
import axios from "axios";
import { POSTS_URL } from "../constants/postsLinks";

export const DataContext = createContext<DataContextType>({
  filteredPosts: [],
  loading: true,
  error: false,
  removePost: () => {},
  searchPostsByTitle: () => {},
});

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get(POSTS_URL)
      .then(({ data }) => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const removePost = (id: number) => {
    axios
      .delete(`${POSTS_URL}${id}`)
      .then(() => {
        setFilteredPosts((prevState) => prevState.filter((posts) => posts.id !== id));
      })
      .catch((error) => {
        setError(error);
      });
  };

  const searchPostsByTitle = (query: string) => {
    const filteredPostsByTitleSearch = posts.filter((post) => {
      return post.title.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredPosts(filteredPostsByTitleSearch);
  };

  const value = { filteredPosts, loading, error, removePost, searchPostsByTitle };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
