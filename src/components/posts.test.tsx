import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Post } from "@/context/types";
import { DataContext } from "../context/dataContext";
import Posts from "./posts";

const mockPosts: Post[] = [
  { id: 1, userId: 1, title: "Post One", body: "This is post one" },
  { id: 2, userId: 1, title: "Post Two", body: "This is post two" },
];

describe("<Posts />", () => {
  it("should display loading message when initially fetching data", () => {
    render(
      <DataContext.Provider
        value={{
          filteredPosts: [],
          loading: true,
          error: false,
          removePost: vi.fn(),
          searchPostsByTitle: vi.fn(),
        }}
      >
        <Posts />
      </DataContext.Provider>
    );

    expect(screen.getByText("Loading posts...")).toBeInTheDocument();
  });

  it("should display error message when there was an issue with getting the data", () => {
    render(
      <DataContext.Provider
        value={{
          filteredPosts: [],
          loading: false,
          error: true,
          removePost: vi.fn(),
          searchPostsByTitle: vi.fn(),
        }}
      >
        <Posts />
      </DataContext.Provider>
    );

    expect(screen.getByText("There was an issue getting the data")).toBeInTheDocument();
  });

  it("should render posts correctly", () => {
    render(
      <DataContext.Provider
        value={{
          filteredPosts: mockPosts,
          loading: false,
          error: false,
          removePost: vi.fn(),
          searchPostsByTitle: vi.fn(),
        }}
      >
        <Posts />
      </DataContext.Provider>
    );

    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  it("should call removePost when remove button is clicked", () => {
    const removePost = vi.fn();

    render(
      <DataContext.Provider
        value={{
          filteredPosts: mockPosts,
          loading: false,
          error: false,
          removePost,
          searchPostsByTitle: vi.fn(),
        }}
      >
        <Posts />
      </DataContext.Provider>
    );

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    fireEvent.click(removeButtons[0]);

    expect(removePost).toHaveBeenCalledWith(1);
  });
});
