import React, { useContext } from "react";
import { DataContext } from "../context/dataContext";

export const Posts: React.FC = () => {
  const { filteredPosts, loading, error, removePost } = useContext(DataContext);

  if (loading) return <p>Loading posts...</p>;

  if (error) return <p>There was an issue getting the data</p>;

  return (
    <ul className="list-none overflow-scroll p-2 lg:p-0">
      {filteredPosts.map((post) => (
        <li
          key={post.id}
          className="border-b-1 border-gray-200 flex justify-center items-center py-4 even:bg-gray-100 px-4"
        >
          <div className="pr-8 text-sm md:text-lg">
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </div>

          <div className="w-24 text-right">
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer h-8 w-10 md:w-fit ml-4 md:px-2"
              onClick={() => removePost(post.id)}
            >
              <span className="hidden md:block">Remove</span>
              <span className="md:hidden">X</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
