import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { DataContext } from "../context/dataContext";
import { SearchBar } from "./search-bar";

describe("<SearchBar />", () => {
  it("should call the searchPostsByTitle function when a query has been typed in", async () => {
    const searchPostsByTitle = vi.fn();
    render(
      <DataContext.Provider
        value={{
          filteredPosts: [],
          loading: true,
          error: false,
          removePost: vi.fn(),
          searchPostsByTitle,
        }}
      >
        <SearchBar />
      </DataContext.Provider>
    );

    const input = screen.getByRole("searchbox");

    await userEvent.type(input, "H");
    expect(searchPostsByTitle).toBeCalledWith("H");
    await userEvent.type(input, "e");
    expect(searchPostsByTitle).toBeCalledWith("He");
    await userEvent.type(input, "llo");
    expect(searchPostsByTitle).toBeCalledWith("Hello");
  });
});
